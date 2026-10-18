import { useEffect, useRef, useState } from "react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import {
  aiAct,
  canPlay,
  createWhot,
  declareShape,
  playCard,
  shapeLabel,
  SHAPES,
  takeMarket,
  type Card,
  type Shape,
  type WhotState,
} from "@/games/whot";
import { blip } from "@/lib/sfx";
import { loadSave, saveSave } from "@/lib/storage";

const INK: Record<Card["shape"], string> = {
  circle: "text-clay",
  triangle: "text-green",
  cross: "text-ink",
  square: "text-star",
  star: "text-gold",
  whot: "text-ink",
};

function Suit({ shape }: { shape: Card["shape"] }) {
  if (shape === "whot") {
    return <span className="font-display text-3xl leading-none text-ink">W</span>;
  }
  return (
    <svg viewBox="0 0 24 24" className={`h-8 w-8 ${INK[shape]}`} aria-hidden>
      {shape === "circle" ? <circle cx="12" cy="12" r="7" fill="currentColor" /> : null}
      {shape === "triangle" ? <polygon points="12,3.5 21,20 3,20" fill="currentColor" /> : null}
      {shape === "cross" ? <path fill="currentColor" d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z" /> : null}
      {shape === "square" ? <rect x="5" y="5" width="14" height="14" rx="1.5" fill="currentColor" /> : null}
      {shape === "star" ? (
        <path fill="currentColor" d="M12 2.2 14.8 8.4 21.5 9.1 16.6 13.7 18 20.5 12 17.1 6 20.5 7.4 13.7 2.5 9.1 9.2 8.4Z" />
      ) : null}
    </svg>
  );
}

function Face({ card, playable, onPlay }: { card: Card; playable: boolean; onPlay?: () => void }) {
  const body = (
    <>
      <span className="absolute left-1.5 top-1 text-xs font-bold">{card.shape === "whot" ? "W" : card.rank}</span>
      <span className="absolute bottom-1 right-1.5 rotate-180 text-xs font-bold">{card.shape === "whot" ? "W" : card.rank}</span>
      <Suit shape={card.shape} />
    </>
  );
  const className = `relative flex h-28 w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 bg-card ${playable ? "border-gold" : "border-line"}`;
  if (!onPlay) return <div className={className}>{body}</div>;
  return (
    <button
      type="button"
      className={`${className} ${playable ? "-translate-y-1" : "opacity-45"}`}
      disabled={!playable}
      aria-label={`${shapeLabel(card.shape)} ${card.shape === "whot" ? "" : card.rank}`.trim()}
      onClick={onPlay}
    >
      {body}
    </button>
  );
}

export function WhotBoard() {
  const [state, setState] = useState<WhotState>(() => createWhot());
  const [record, setRecord] = useState({ wins: 0, games: 0 });
  const [gameId, setGameId] = useState(0);
  const filed = useRef<number | null>(null);

  useEffect(() => {
    const save = loadSave();
    setRecord({ wins: save.arcade.whotWins, games: save.arcade.whotGames });
  }, []);

  useEffect(() => {
    if (state.phase !== "ai") return;
    const timer = window.setTimeout(() => {
      setState((current) => (current.phase === "ai" ? aiAct(current) : current));
    }, 650);
    return () => window.clearTimeout(timer);
  }, [state.phase, state.turn]);

  useEffect(() => {
    if (state.phase !== "over" || filed.current === gameId) return;
    filed.current = gameId;
    const save = loadSave();
    save.arcade.whotGames += 1;
    if (state.winner === "player") save.arcade.whotWins += 1;
    saveSave(save);
    setRecord({ wins: save.arcade.whotWins, games: save.arcade.whotGames });
    blip(state.winner === "player" ? 680 : 160, 0.1, state.winner === "player" ? "sine" : "triangle");
  }, [state.phase, state.winner, gameId]);

  const top = state.discard[state.discard.length - 1];
  const yourTurn = state.phase === "player";

  function play(id: string) {
    if (!yourTurn) return;
    const card = state.player.find((item) => item.id === id);
    if (!card || !canPlay(card, state)) return;
    blip(520, 0.04);
    setState(playCard(state, id, "player"));
  }

  return (
    <GameFrame
      kicker="Arcade · two players"
      title="Whot"
      help={
        <>
          Match the shape or the number. Whot is wild: play it and call the next shape. 1 is hold on and 8 is suspension, so in this two-player game you play again. 2 is pick two, and another 2 can stack on it. 14 is general market: the other side draws one, then plays. If you cannot play, go to market. A normal draw is played immediately when it fits. First empty hand wins.
        </>
      }
    >
      <p className="text-sm text-muted">
        Your record {record.wins}/{record.games || 0}
      </p>
      <div className="mt-3 rounded-3xl bg-green px-3 py-4 text-paper">
        <div className="flex items-center justify-between gap-3">
          <div className="flex" aria-hidden>
            {Array.from({ length: Math.min(state.ai.length, 6) }, (_, index) => (
              <div
                key={index}
                className="grid h-16 w-11 place-items-center rounded-lg border border-paper/30 bg-ink"
              >
                <span className="size-4 rounded-full border-2 border-gold" />
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold">{state.ai.length} cards</p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            className="grid h-28 w-20 place-items-center rounded-xl bg-ink text-center text-xs font-semibold text-paper"
            onClick={() => yourTurn && setState(takeMarket(state, "player"))}
            disabled={!yourTurn}
          >
            Market
            <span className="mt-1 block text-lg">{state.market.length}</span>
          </button>
          {top ? <Face card={top} playable={false} /> : null}
        </div>
        <p className="mt-3 text-center text-sm">
          {top?.shape === "whot" && state.called ? `Called ${shapeLabel(state.called)}. ` : ""}
          {state.pending > 0 ? `Pick ${state.pending} waiting. ` : ""}
          {state.phase === "ai" ? "Computer is playing." : state.message}
        </p>
      </div>

      {state.phase === "declare" ? (
        <div className="mt-4 rounded-2xl border border-line bg-card p-4">
          <p className="font-display text-2xl text-ink">Call a shape</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {SHAPES.map((shape) => (
              <button
                key={shape}
                type="button"
                className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-line bg-paper text-xs font-semibold"
                onClick={() => {
                  blip(600, 0.05);
                  setState(declareShape(state, shape as Shape));
                }}
              >
                <Suit shape={shape} />
                {shapeLabel(shape)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Your hand">
        {state.player.map((card) => {
          const allowed = yourTurn && canPlay(card, state);
          return <Face key={card.id} card={card} playable={allowed} onPlay={() => play(card.id)} />;
        })}
      </div>
      <p aria-live="polite" className="min-h-6 text-sm text-muted">
        {yourTurn ? "Gold edges can be played." : state.phase === "over" ? state.message : "Wait for the computer."}
      </p>
      {state.phase === "over" ? (
        <WinNote
          title={state.winner === "player" ? "Hand clear." : state.winner === "draw" ? "Draw." : "Computer finished first."}
          text={state.winner === "player" ? "Deal again if the shop is still quiet." : "One more hand?"}
        />
      ) : null}
      <Btn
        variant="line"
        className="mt-4"
        onClick={() => {
          setGameId((id) => id + 1);
          setState(createWhot());
        }}
      >
        New hand
      </Btn>
    </GameFrame>
  );
}
