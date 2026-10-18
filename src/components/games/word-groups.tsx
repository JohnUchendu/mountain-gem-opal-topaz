import { useEffect, useMemo, useRef, useState } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { lagosDate, lagosLabel } from "@/lib/lagos";
import { dailyGroups, matchGroup, oneAway, type Group, type Tone } from "@/lib/puzzles";
import { blip } from "@/lib/sfx";
import { loadProgress, loadSave, markDaily, saveProgress, saveSave } from "@/lib/storage";

const TONE: Record<Tone, string> = {
  gold: "bg-gold-soft text-ink",
  green: "bg-green-soft text-ink",
  clay: "bg-clay-soft text-ink",
  ink: "bg-ink text-paper",
};

type Saved = { solved: Group[]; mistakes: number; selected: string[]; lost: boolean };

export function WordGroups() {
  const date = useMemo(() => lagosDate(), []);
  const { puzzle, words } = useMemo(() => dailyGroups(date), [date]);
  const key = `word-groups:${date}`;
  const [solved, setSolved] = useState<Group[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("Tap four words that belong together.");
  const [shake, setShake] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const filed = useRef(false);

  useEffect(() => {
    const saved = loadProgress<Saved>(key);
    if (saved) {
      setSolved(saved.solved ?? []);
      setSelected(saved.selected ?? []);
      setMistakes(saved.mistakes ?? 0);
      setLost(saved.lost ?? false);
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(key, { solved, mistakes, selected, lost });
  }, [ready, key, solved, mistakes, selected, lost]);

  const won = solved.length === 4;
  const done = won || lost;

  useEffect(() => {
    if (!ready || filed.current || !done) return;
    filed.current = true;
    saveSave(markDaily(loadSave(), "word-groups", date, won));
    if (lost) setMessage("Four misses. Here is how they grouped.");
    if (won) setMessage("All four. Clean board.");
  }, [ready, done, won, lost, date]);

  const remaining = words.filter((word) => !solved.some((group) => group.words.includes(word)));

  function toggle(word: string) {
    if (done || solved.some((group) => group.words.includes(word))) return;
    setSelected((current) => {
      if (current.includes(word)) return current.filter((item) => item !== word);
      if (current.length >= 4) return current;
      return [...current, word];
    });
  }

  function submit() {
    if (selected.length !== 4 || done) return;
    const group = matchGroup(puzzle, selected);
    if (group) {
      setSolved((current) => [...current, group]);
      setSelected([]);
      setMessage(group.label);
      blip(620, 0.08);
      return;
    }
    const nextMistakes = mistakes + 1;
    setMistakes(nextMistakes);
    setShake(true);
    window.setTimeout(() => setShake(false), 280);
    blip(160, 0.08, "square");
    if (oneAway(puzzle, selected)) setMessage("One away.");
    else setMessage("Those four do not share a group.");
    if (nextMistakes >= 4) {
      setLost(true);
      setSolved(puzzle.groups);
      setSelected([]);
    }
  }

  async function share() {
    const text = `JKTL Word Groups · ${lagosLabel(date)}\n${won ? `Solved · ${mistakes} miss${mistakes === 1 ? "" : "es"}` : "Not today"}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setMessage("Could not copy.");
    }
  }

  return (
    <GameFrame
      kicker={`Daily · ${lagosLabel(date)}`}
      title="Word Groups"
      help="Find four groups of four. You have four mistakes. If three of your words belong together, the game will say you are one away. Today's groups are the same for every shop."
    >
      <div className="flex gap-2" aria-label="Mistakes left">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className={`size-3 rounded-full ${index < mistakes ? "bg-clay" : "bg-line"}`} />
        ))}
        <span className="text-sm text-muted">{4 - Math.min(mistakes, 4)} mistakes left</span>
      </div>
      <div className="mt-4 space-y-2">
        {solved.map((group) => (
          <div key={group.label} className={`rounded-2xl px-3 py-3 text-center ${TONE[group.tone]}`}>
            <p className="font-bold">{group.label}</p>
            <p className="mt-1 text-sm">{group.words.join(" · ")}</p>
          </div>
        ))}
      </div>
      {!done ? (
        <>
          <div className={`mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 ${shake ? "animate-shake" : ""}`}>
            {remaining.map((word) => {
              const on = selected.includes(word);
              return (
                <button
                  key={word}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(word)}
                  className={`min-h-16 rounded-xl border px-2 text-center text-sm font-bold leading-tight ${on ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink"}`}
                >
                  {word}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn onClick={submit} disabled={selected.length !== 4}>
              Submit four
            </Btn>
            <Btn variant="line" onClick={() => setSelected([])}>
              Clear
            </Btn>
          </div>
        </>
      ) : null}
      <p aria-live="polite" className="mt-4 min-h-6 text-sm text-muted">
        {message}
      </p>
      {done ? (
        <WinNote
          title={won ? "Grouped." : "The board is open."}
          text={won ? "Come back after midnight Lagos time for a new set." : "The colours are the groups you were hunting."}
          onShare={() => void share()}
          copied={copied}
        />
      ) : null}
    </GameFrame>
  );
}
