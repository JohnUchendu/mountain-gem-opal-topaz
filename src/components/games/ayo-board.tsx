import { useEffect, useRef, useState } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { aiChoose, applyMove, initialAyo, legalMoves, type AyoState } from "@/games/ayo";
import { blip } from "@/lib/sfx";
import { loadSave, saveSave } from "@/lib/storage";

function wait(ms: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function AyoBoard() {
  const [view, setView] = useState<AyoState>(() => initialAyo());
  const [preview, setPreview] = useState<number[] | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [record, setRecord] = useState({ wins: 0, games: 0 });
  const viewRef = useRef(view);
  const busyRef = useRef(false);
  const filed = useRef(0);
  const gameRef = useRef(1);
  const gen = useRef(0);

  useEffect(() => {
    const save = loadSave();
    setRecord({ wins: save.arcade.ayoWins, games: save.arcade.ayoGames });
  }, []);

  useEffect(() => {
    if (!view.over || filed.current === gameRef.current) return;
    filed.current = gameRef.current;
    const save = loadSave();
    save.arcade.ayoGames += 1;
    if (view.winner === "player") save.arcade.ayoWins += 1;
    saveSave(save);
    setRecord({ wins: save.arcade.ayoWins, games: save.arcade.ayoGames });
    blip(view.winner === "player" ? 640 : 180, 0.1);
  }, [view.over, view.winner]);

  const board = preview ?? view.board;
  const legal = view.turn === 0 && !view.over && !busy ? legalMoves(view.board, 0) : [];

  async function animate(base: readonly number[], index: number, path: number[], token: number) {
    if (path.length === 0) return;
    const next = base.slice();
    next[index] = 0;
    setPreview(next.slice());
    const step = path.length > 14 ? 40 : 80;
    for (const pit of path) {
      if (gen.current !== token) return;
      next[pit] += 1;
      setHot(pit);
      setPreview(next.slice());
      await wait(step);
    }
  }

  async function onPit(index: number) {
    if (busyRef.current) return;
    const current = viewRef.current;
    if (current.over || current.turn !== 0) return;
    const played = applyMove(current, index);
    if (played.path.length === 0) return;
    const token = gen.current;
    busyRef.current = true;
    setBusy(true);
    try {
      blip(480, 0.04);
      await animate(current.board, index, played.path, token);
      if (gen.current !== token) return;
      let latest = played.state;
      viewRef.current = latest;
      setPreview(null);
      setHot(null);
      setView(latest);
      if (!latest.over && latest.turn === 1) {
        await wait(240);
        if (gen.current !== token) return;
        const choice = aiChoose(latest);
        if (choice >= 0) {
          const reply = applyMove(latest, choice);
          await animate(latest.board, choice, reply.path, token);
          if (gen.current !== token) return;
          latest = reply.state;
          viewRef.current = latest;
          setPreview(null);
          setHot(null);
          setView(latest);
        }
      }
    } finally {
      if (gen.current === token) {
        busyRef.current = false;
        setBusy(false);
      }
    }
  }

  function pit(index: number, mine: boolean) {
    const count = board[index] ?? 0;
    const playable = mine && legal.includes(index);
    const className = `flex aspect-square flex-col items-center justify-center rounded-full border-2 text-lg font-bold ${
      hot === index ? "border-gold bg-gold text-ink" : playable ? "border-green bg-gold-soft text-ink" : "border-line bg-card text-ink"
    }`;
    if (!mine) {
      return (
        <div key={index} className={className} aria-label={`Computer pit ${count}`}>
          {count}
        </div>
      );
    }
    return (
      <button key={index} type="button" className={className} disabled={!playable} onClick={() => void onPit(index)} aria-label={`Your pit, ${count} seeds`}>
        {count}
      </button>
    );
  }

  return (
    <GameFrame
      kicker="Arcade · the seed board"
      title="Ayo"
      help="Tap a near pit to sow its seeds one by one to the right, around the board. The pit you started from is skipped if the seeds come all the way around. If the last seed lands on the far row and makes 2 or 3, you capture that pit and any 2s and 3s sitting just behind it. You cannot empty the far row in one capture. If the far row is empty, you must feed it when you can. First to 25 captured seeds wins. If a side cannot move, seeds left on each row go to that row's owner."
    >
      <div className="flex items-center justify-between text-sm">
        <p>
          Computer <span className="font-bold">{view.store[1]}</span>
        </p>
        <p className="text-muted">
          {record.wins}/{record.games} wins
        </p>
        <p>
          You <span className="font-bold">{view.store[0]}</span>
        </p>
      </div>
      <div className="mt-3 rounded-3xl border border-line bg-card p-3">
        <div className="grid grid-cols-6 gap-1.5">{[6, 7, 8, 9, 10, 11].map((index) => pit(index, false))}</div>
        <div className="mt-1.5 grid grid-cols-6 gap-1.5">{[0, 1, 2, 3, 4, 5].map((index) => pit(index, true))}</div>
      </div>
      <p aria-live="polite" className="mt-3 min-h-6 text-sm text-muted">
        {busy && view.turn === 1 ? "Computer is sowing." : view.message}
      </p>
      {view.over ? (
        <WinNote
          title={view.winner === "player" ? "The board is yours." : view.winner === "draw" ? "Level board." : "Computer keeps the seeds."}
          text={`You ${view.store[0]} · Computer ${view.store[1]}.`}
        />
      ) : null}
      <Btn
        variant="line"
        className="mt-4"
        onClick={() => {
          gen.current += 1;
          busyRef.current = false;
          setBusy(false);
          const fresh = initialAyo();
          gameRef.current += 1;
          viewRef.current = fresh;
          setPreview(null);
          setHot(null);
          setView(fresh);
        }}
      >
        New board
      </Btn>
    </GameFrame>
  );
}
