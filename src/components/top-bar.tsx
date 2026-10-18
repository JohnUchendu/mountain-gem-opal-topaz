import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, soundEnabled } from "@/lib/sfx";

export function Brand() {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2">
      <span className="grid size-8 place-items-center rounded-lg bg-green text-sm font-bold text-paper">J</span>
      <span className="font-display text-xl leading-none text-ink">
        JKTL <span className="text-green">Games</span>
      </span>
    </Link>
  );
}

export function TopBar({ back = false }: { back?: boolean }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(soundEnabled());
  }, []);

  return (
    <div className="flex items-center justify-between gap-3">
      {back ? (
        <Link to="/" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink">
          <ChevronLeft className="size-5" aria-hidden />
          All games
        </Link>
      ) : (
        <Brand />
      )}
      <button
        type="button"
        aria-pressed={on}
        aria-label={on ? "Mute sounds" : "Turn sounds on"}
        className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink"
        onClick={() => {
          const next = !on;
          setOn(next);
          setSoundEnabled(next);
        }}
      >
        {on ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
      </button>
    </div>
  );
}
