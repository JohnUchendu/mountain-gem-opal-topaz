import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { lagosDate, lagosLabel } from "@/lib/lagos";
import { dailyRiddle } from "@/lib/puzzles";
import { loose } from "@/lib/score";
import { blip } from "@/lib/sfx";
import { loadProgress, loadSave, markDaily, saveProgress, saveSave } from "@/lib/storage";

export function Riddle() {
  const date = useMemo(() => lagosDate(), []);
  const riddle = useMemo(() => dailyRiddle(date), [date]);
  const key = `riddle:${date}`;
  const [answer, setAnswer] = useState("");
  const [tries, setTries] = useState(0);
  const [won, setWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState("Read it twice. The simple answer is usually right.");
  const [ready, setReady] = useState(false);
  const filed = useRef(false);

  useEffect(() => {
    const saved = loadProgress<{ tries: number; won: boolean; showHint: boolean }>(key);
    if (saved) {
      setTries(saved.tries ?? 0);
      setWon(saved.won ?? false);
      setShowHint(saved.showHint ?? false);
      if (saved.won) setMessage("You already solved today's riddle.");
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(key, { tries, won, showHint });
  }, [ready, key, tries, won, showHint]);

  useEffect(() => {
    if (!ready || !won || filed.current) return;
    filed.current = true;
    saveSave(markDaily(loadSave(), "riddle", date, true));
  }, [ready, won, date]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (won || !answer.trim()) return;
    const nextTries = tries + 1;
    setTries(nextTries);
    const got = loose(answer);
    const correct = riddle.answers.some((item) => loose(item) === got);
    if (correct) {
      setWon(true);
      setMessage("That is it.");
      blip(680, 0.1);
      return;
    }
    setMessage(nextTries >= 3 ? "Still off. The hint is there if you want it." : "Not quite. Try a plainer answer.");
    blip(170, 0.07, "square");
  }

  return (
    <GameFrame
      kicker={`Daily · ${lagosLabel(date)}`}
      title="Riddle"
      help="Type the answer in your own words. Small words like 'a' and 'the' do not matter. The hint does not spoil the streak."
    >
      <div className="rounded-3xl border border-line bg-card px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Today's clue</p>
        <p className="mt-3 font-display text-2xl leading-snug text-ink">{riddle.prompt}</p>
        <form onSubmit={submit} className="mt-6 flex flex-col gap-2 sm:flex-row">
          <input
            aria-label="Riddle answer"
            value={answer}
            disabled={won}
            onChange={(event) => setAnswer(event.target.value.slice(0, 80))}
            className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-base text-ink outline-none"
            placeholder="Your answer"
            autoComplete="off"
          />
          <Btn type="submit" disabled={won || !answer.trim()}>
            Answer
          </Btn>
        </form>
        {showHint ? <p className="mt-4 text-sm text-muted">Hint: {riddle.hint}</p> : null}
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-sm text-muted">
        {message} {tries > 0 ? `Tries: ${tries}.` : ""}
      </p>
      {!won ? (
        <Btn variant="line" className="mt-2" onClick={() => setShowHint(true)}>
          Show hint
        </Btn>
      ) : (
        <WinNote title="Solved." text="A new clue lands after midnight in Lagos." />
      )}
    </GameFrame>
  );
}
