import { useEffect, useRef, useState } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { DENOMS, makeSale, naira, sumDenoms, type Sale } from "@/games/till";
import { blip } from "@/lib/sfx";
import { loadSave, saveSave } from "@/lib/storage";

const ROUND = 60;

export function TillBoard() {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [sale, setSale] = useState<Sale>(() => makeSale());
  const [given, setGiven] = useState<number[]>([]);
  const [left, setLeft] = useState(ROUND);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [shake, setShake] = useState(false);
  const [note, setNote] = useState("Count it out, then hand it over.");
  const scoreRef = useRef(0);
  const filed = useRef(false);

  useEffect(() => {
    setBest(loadSave().arcade.tillBest);
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const started = performance.now();
    let frame = 0;
    let lastShown = ROUND;
    const loop = (now: number) => {
      const remain = Math.max(0, ROUND - (now - started) / 1000);
      const shown = Math.ceil(remain);
      if (shown !== lastShown) {
        lastShown = shown;
        setLeft(shown);
      }
      if (remain <= 0) {
        setPhase("done");
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done" || filed.current) return;
    filed.current = true;
    const save = loadSave();
    if (scoreRef.current > save.arcade.tillBest) save.arcade.tillBest = scoreRef.current;
    saveSave(save);
    setBest(save.arcade.tillBest);
    blip(scoreRef.current > 0 ? 640 : 180, 0.1);
  }, [phase]);

  const due = sale.paid - sale.total;
  const handed = sumDenoms(given);
  const width = Math.max(0, Math.min(100, (left / ROUND) * 100));

  function give() {
    if (handed !== due) {
      setShake(true);
      window.setTimeout(() => setShake(false), 280);
      setNote(handed > due ? "That is too much." : "Still short.");
      blip(160, 0.07, "square");
      return;
    }
    const next = scoreRef.current + 1;
    scoreRef.current = next;
    setScore(next);
    setSale(makeSale());
    setGiven([]);
    setNote("Correct. Next customer.");
    blip(620, 0.05);
  }

  return (
    <GameFrame
      kicker="Arcade · one minute"
      title="Till Rush"
      help="The receipt shows the total and what the customer handed you. Tap notes and coins until the change is exact, then give it. A wrong handful stays on the counter so you can fix it. Serve as many people as you can before the minute ends."
    >
      {phase === "ready" ? (
        <div className="rounded-3xl border border-line bg-card px-5 py-6">
          <p className="font-display text-3xl leading-tight text-ink">The till is closed.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            You have 60 seconds. Exact change only. {best > 0 ? `Your best is ${best} customers.` : "No best yet."}
          </p>
          <Btn
            className="mt-5"
            onClick={() => {
              scoreRef.current = 0;
              filed.current = false;
              setScore(0);
              setGiven([]);
              setSale(makeSale());
              setLeft(ROUND);
              setNote("Count it out, then hand it over.");
              setPhase("play");
            }}
          >
            Open the till
          </Btn>
        </div>
      ) : null}

      {phase === "play" ? (
        <>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-green" style={{ width: `${width}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">
            {left}s left · served {score}
          </p>
          <div className={`mt-3 rounded-3xl border border-line bg-card px-5 py-5 ${shake ? "animate-shake" : ""}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">{sale.name}</p>
            <p className="mt-1 font-display text-2xl leading-tight text-ink">{sale.item}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Total</dt>
                <dd className="font-semibold">{naira(sale.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Paid</dt>
                <dd className="font-semibold">{naira(sale.paid)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-base">
                <dt>Change</dt>
                <dd className="font-bold">{naira(due)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">In your hand</dt>
                <dd className={handed === due ? "font-bold text-green" : handed > due ? "font-bold text-clay" : "font-semibold"}>
                  {naira(handed)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {DENOMS.map((value) => (
              <button
                key={value}
                type="button"
                className="min-h-14 rounded-2xl border border-line bg-gold-soft text-sm font-bold text-ink"
                onClick={() => setGiven((current) => [...current, value])}
              >
                {naira(value)}
              </button>
            ))}
          </div>
          {given.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {given.map((value, index) => (
                <button
                  key={`${value}-${index}`}
                  type="button"
                  className="min-h-11 rounded-full border border-line bg-card px-3 text-sm font-semibold"
                  onClick={() => setGiven((current) => current.filter((_, item) => item !== index))}
                >
                  {naira(value)} ×
                </button>
              ))}
            </div>
          ) : null}
          <p aria-live="polite" className="mt-3 min-h-6 text-sm text-muted">
            {note}
          </p>
          <div className="mt-2 flex gap-2">
            <Btn onClick={give}>Give change</Btn>
            <Btn variant="line" onClick={() => setGiven([])}>
              Clear hand
            </Btn>
          </div>
        </>
      ) : null}

      {phase === "done" ? (
        <>
          <WinNote
            title={score === 0 ? "The minute went." : `${score} served.`}
            text={score >= best && score > 0 ? "That is the best this phone has seen." : `Best on this phone: ${best}.`}
          />
          <Btn className="mt-4" onClick={() => setPhase("ready")}>
            Count again
          </Btn>
        </>
      ) : null}
    </GameFrame>
  );
}
