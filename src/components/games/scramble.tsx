import { useEffect, useMemo, useRef, useState } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { lagosDate, lagosLabel } from "@/lib/lagos";
import { dailyScramble } from "@/lib/puzzles";
import { blip } from "@/lib/sfx";
import { loadProgress, loadSave, markDaily, saveProgress, saveSave } from "@/lib/storage";

type Tile = { letter: string; index: number };

export function Scramble() {
  const date = useMemo(() => lagosDate(), []);
  const { puzzle, letters } = useMemo(() => dailyScramble(date), [date]);
  const pool = useMemo<Tile[]>(
    () => letters.split("").map((letter, index) => ({ letter, index })),
    [letters],
  );
  const key = `scramble:${date}`;
  const [picked, setPicked] = useState<number[]>([]);
  const [message, setMessage] = useState(puzzle.hint);
  const [won, setWon] = useState(false);
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState(false);
  const [ready, setReady] = useState(false);
  const [shake, setShake] = useState(false);
  const filed = useRef(false);

  useEffect(() => {
    const saved = loadProgress<{ picked: number[]; won: boolean; tries: number; hint: boolean }>(key);
    if (saved) {
      setPicked(saved.picked ?? []);
      setWon(saved.won ?? false);
      setTries(saved.tries ?? 0);
      setHint(saved.hint ?? false);
      if (saved.won) setMessage("Already solved today.");
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(key, { picked, won, tries, hint });
  }, [ready, key, picked, won, tries, hint]);

  useEffect(() => {
    if (!ready || !won || filed.current) return;
    filed.current = true;
    saveSave(markDaily(loadSave(), "scramble", date, true));
  }, [ready, won, date]);

  const built = picked.map((index) => pool[index]?.letter ?? "").join("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (won) return;
      const onButton = event.target instanceof HTMLElement && Boolean(event.target.closest("button"));
      if ((event.key === "Enter" || event.key === "Backspace") && onButton) return;
      if (event.key === "Backspace") {
        setPicked((current) => current.slice(0, -1));
      } else if (event.key === "Enter") {
        check();
      } else if (/^[a-z]$/i.test(event.key)) {
        const letter = event.key.toUpperCase();
        setPicked((current) => {
          const tile = pool.find((item) => item.letter === letter && !current.includes(item.index));
          return tile ? [...current, tile.index] : current;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function check() {
    if (won || built.length !== puzzle.answer.length) {
      setMessage("Use every letter.");
      return;
    }
    setTries((count) => count + 1);
    if (built === puzzle.answer) {
      setWon(true);
      setMessage("That is the word.");
      blip(680, 0.1);
      return;
    }
    setShake(true);
    window.setTimeout(() => setShake(false), 280);
    setMessage("Not that order. Try again.");
    blip(170, 0.08, "square");
  }

  return (
    <GameFrame
      kicker={`Daily · ${lagosLabel(date)}`}
      title="Scramble"
      help="Tap the letters into the right order, or type on your keyboard. The hint under the tiles is a nudge, not the answer. Everyone gets the same word today."
    >
      <p className="text-sm leading-relaxed text-muted">{puzzle.hint}</p>
      <div className={`mt-5 flex min-h-16 flex-wrap justify-center gap-2 ${shake ? "animate-shake" : ""}`}>
        {Array.from({ length: puzzle.answer.length }, (_, slot) => {
          const index = picked[slot];
          const letter = index == null ? "" : pool[index].letter;
          return (
            <button
              key={slot}
              type="button"
              className="flex size-12 items-center justify-center rounded-xl border-2 border-ink bg-card text-xl font-bold"
              onClick={() => setPicked((current) => current.filter((item) => item !== index))}
              disabled={!letter || won}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {pool.map((tile) => {
          const used = picked.includes(tile.index);
          return (
            <button
              key={tile.index}
              type="button"
              disabled={used || won}
              onClick={() => setPicked((current) => [...current, tile.index])}
              className="flex size-12 items-center justify-center rounded-xl border border-line bg-gold-soft text-xl font-bold text-ink disabled:opacity-30"
            >
              {tile.letter}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-center text-sm text-muted">
        {message}
        {hint && !won ? ` Starts with ${puzzle.answer[0]}.` : ""}
      </p>
      {!won ? (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Btn onClick={check} disabled={built.length !== puzzle.answer.length}>
            Check
          </Btn>
          <Btn variant="line" onClick={() => setPicked([])}>
            Clear
          </Btn>
          <Btn variant="ghost" onClick={() => setHint(true)}>
            First letter
          </Btn>
        </div>
      ) : (
        <WinNote title="Unscrambled." text={`${puzzle.answer} · ${tries} ${tries === 1 ? "try" : "tries"}.`} />
      )}
    </GameFrame>
  );
}
