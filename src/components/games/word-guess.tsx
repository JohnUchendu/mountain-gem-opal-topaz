import { useEffect, useMemo, useRef, useState } from "react";
import { Delete } from "lucide-react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { GUESSES } from "@/lib/guesses";
import { lagosDate, lagosLabel } from "@/lib/lagos";
import { dailyAnswer } from "@/lib/puzzles";
import { scoreGuess, type Mark } from "@/lib/score";
import { blip } from "@/lib/sfx";
import { loadProgress, loadSave, markDaily, saveProgress, saveSave } from "@/lib/storage";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type Row = { guess: string; marks: Mark[] };

const TILE: Record<Mark | "empty" | "typed", string> = {
  correct: "border-green bg-green text-paper",
  present: "border-gold bg-gold text-ink",
  absent: "border-ink-soft bg-ink-soft text-paper",
  empty: "border-line bg-card text-ink",
  typed: "border-ink bg-card text-ink",
};

export function WordGuess() {
  const date = useMemo(() => lagosDate(), []);
  const answer = useMemo(() => dailyAnswer(date), [date]);
  const key = `word-guess:${date}`;
  const [rows, setRows] = useState<Row[]>([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const filed = useRef(false);

  useEffect(() => {
    const saved = loadProgress<{ rows: Row[]; guess: string }>(key);
    if (saved) {
      setRows(saved.rows ?? []);
      setGuess(saved.guess ?? "");
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(key, { rows, guess });
  }, [ready, key, rows, guess]);

  const won = rows.some((row) => row.guess === answer);
  const lost = !won && rows.length >= 6;

  useEffect(() => {
    if (!ready || filed.current || (!won && !lost)) return;
    filed.current = true;
    saveSave(markDaily(loadSave(), "word-guess", date, won));
  }, [ready, won, lost, date]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      const onButton = target instanceof HTMLElement && Boolean(target.closest("button"));
      if (event.key === "Enter") {
        if (onButton) return;
        event.preventDefault();
        submit();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setGuess((current) => current.slice(0, -1));
      } else if (/^[a-z]$/i.test(event.key)) {
        setGuess((current) => (current.length >= 5 ? current : (current + event.key).toUpperCase()));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function bump(text: string) {
    setMessage(text);
    setShake(true);
    window.setTimeout(() => setShake(false), 280);
  }

  function submit() {
    if (won || lost) return;
    if (guess.length !== 5) {
      bump("Five letters.");
      return;
    }
    if (!GUESSES.has(guess)) {
      bump("Not in the word list.");
      blip(180, 0.08, "square");
      return;
    }
    const marks = scoreGuess(guess, answer);
    const next = [...rows, { guess, marks }];
    setRows(next);
    setGuess("");
    if (guess === answer) {
      setMessage("Sharp. Same word every shop got today.");
      blip(680, 0.12);
    } else if (next.length >= 6) {
      setMessage(`It was ${answer}.`);
      blip(150, 0.12, "triangle");
    } else {
      setMessage("");
      blip(460, 0.04);
    }
  }

  const letterMark = new Map<string, Mark>();
  for (const row of rows) {
    row.guess.split("").forEach((letter, index) => {
      const mark = row.marks[index];
      const prev = letterMark.get(letter);
      if (mark === "correct" || !prev || (mark === "present" && prev === "absent")) letterMark.set(letter, mark);
    });
  }

  async function share() {
    const squares = rows
      .map((row) => row.marks.map((mark) => (mark === "correct" ? "G" : mark === "present" ? "Y" : "B")).join(""))
      .join("\n");
    const text = `JKTL Word Guess · ${lagosLabel(date)}\n${won ? `${rows.length}/6` : "X/6"}\n${squares}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setMessage("Could not copy. Screenshot the grid instead.");
    }
  }

  return (
    <GameFrame
      kicker={`Daily · ${lagosLabel(date)}`}
      title="Word Guess"
      help="Guess the five-letter word in six tries. Green means right letter, right place. Gold means the letter is in the word. Cocoa means it is not. Today's word is shared by every shop on Lagos time."
    >
      <div className={`mx-auto grid max-w-sm gap-2 ${shake ? "animate-shake" : ""}`} aria-label="Guesses">
        {Array.from({ length: 6 }, (_, rowIndex) => {
          const row = rows[rowIndex];
          const live = rowIndex === rows.length && !won && !lost;
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }, (_, col) => {
                const letter = row?.guess[col] ?? (live ? guess[col] : "") ?? "";
                const tone = row ? TILE[row.marks[col]] : letter ? TILE.typed : TILE.empty;
                return (
                  <div
                    key={col}
                    className={`flex aspect-square items-center justify-center rounded-xl border-2 text-2xl font-bold ${tone} ${row ? "animate-pop" : ""}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-center text-sm text-muted">
        {message}
      </p>
      {won || lost ? (
        <WinNote
          title={won ? "In the book." : "Tomorrow's word is new."}
          text={won ? `Solved in ${rows.length} of 6.` : `The word was ${answer}.`}
          onShare={() => void share()}
          copied={copied}
        />
      ) : (
        <div className="mx-auto mt-2 max-w-lg">
          {ROWS.map((row) => (
            <div key={row} className="mt-2 flex justify-center gap-1">
              {row.split("").map((letter) => {
                const mark = letterMark.get(letter);
                const tone = mark ? TILE[mark] : "border-line bg-card text-ink";
                return (
                  <button
                    key={letter}
                    type="button"
                    className={`h-12 min-w-0 flex-1 rounded-lg border text-sm font-bold ${tone}`}
                    onClick={() => setGuess((current) => (current.length >= 5 ? current : current + letter))}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="mt-2 flex justify-center gap-2">
            <Btn variant="line" onClick={() => setGuess((current) => current.slice(0, -1))} aria-label="Delete">
              <Delete className="size-4" />
            </Btn>
            <Btn onClick={submit}>Enter</Btn>
          </div>
        </div>
      )}
    </GameFrame>
  );
}
