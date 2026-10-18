import { useEffect, useRef, useState } from "react";
import { Apple, Droplets, Egg, Fish, Flame, Package, Shirt, Wheat, type LucideIcon } from "lucide-react";
import { GameFrame, WinNote } from "@/components/game-frame";
import { Btn } from "@/components/btn";
import { blip } from "@/lib/sfx";
import { loadSave, saveSave } from "@/lib/storage";

type Good = { key: string; label: string; icon: LucideIcon };

const GOODS: Good[] = [
  { key: "rice", label: "Rice", icon: Wheat },
  { key: "oil", label: "Palm oil", icon: Droplets },
  { key: "ankara", label: "Ankara", icon: Shirt },
  { key: "suya", label: "Suya", icon: Flame },
  { key: "fish", label: "Fish", icon: Fish },
  { key: "apple", label: "Apple", icon: Apple },
  { key: "eggs", label: "Eggs", icon: Egg },
  { key: "carton", label: "Carton", icon: Package },
];

function deal() {
  const picks = GOODS.slice(0, 8);
  const cards = picks.flatMap((good) => [
    { id: `${good.key}-a`, ...good },
    { id: `${good.key}-b`, ...good },
  ]);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function MemoryBoard() {
  const [cards, setCards] = useState(deal);
  const [up, setUp] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const [noted, setNoted] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const won = matched.length === 8;

  useEffect(() => {
    setBest(loadSave().arcade.memoryBest);
    return () => {
      if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
    };
  }, []);

  function finish(nextMoves: number) {
    if (noted) return;
    setNoted(true);
    const save = loadSave();
    if (save.arcade.memoryBest == null || nextMoves < save.arcade.memoryBest) {
      save.arcade.memoryBest = nextMoves;
      saveSave(save);
      setBest(nextMoves);
    } else setBest(save.arcade.memoryBest);
    blip(660, 0.1);
  }

  function flip(id: string, key: string) {
    if (lock || won || up.includes(id) || matched.includes(key)) return;
    const next = [...up, id];
    setUp(next);
    blip(500, 0.03);
    if (next.length < 2) return;
    setMoves((count) => count + 1);
    const [firstId, secondId] = next;
    const first = cards.find((card) => card.id === firstId);
    const second = cards.find((card) => card.id === secondId);
    if (first && second && first.key === second.key) {
      const found = [...matched, first.key];
      setMatched(found);
      setUp([]);
      if (found.length === 8) finish(moves + 1);
      return;
    }
    setLock(true);
    hideTimer.current = window.setTimeout(() => {
      setUp([]);
      setLock(false);
    }, 700);
  }

  function restart() {
    setCards(deal());
    setUp([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
    setNoted(false);
  }

  return (
    <GameFrame
      kicker="Arcade · the stall"
      title="Market Memory"
      help="Flip two goods. If they match, they stay. If they do not, they turn back. The score is how many pairs you tried. Lower is sharper."
    >
      <p className="text-sm text-muted">
        Moves {moves}
        {best != null ? ` · best ${best}` : ""}
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {cards.map((card) => {
          const open = up.includes(card.id) || matched.includes(card.key);
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(card.id, card.key)}
              className={`flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-1 text-center ${open ? "border-green bg-card text-ink" : "border-green bg-green text-paper"}`}
              aria-label={open ? card.label : "Hidden good"}
            >
              {open ? (
                <>
                  <Icon className="size-6" aria-hidden />
                  <span className="text-xs font-semibold leading-tight">{card.label}</span>
                </>
              ) : (
                <span className="size-3 rounded-full border-2 border-gold" />
              )}
            </button>
          );
        })}
      </div>
      {won ? <WinNote title="Stall memorised." text={`${moves} moves${best === moves ? ". New best." : "."}`} /> : null}
      <Btn variant="line" className="mt-4" onClick={restart}>
        New stall
      </Btn>
    </GameFrame>
  );
}
