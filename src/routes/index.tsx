import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GAMES } from "@/lib/catalog";
import { lagosDate, lagosLabel } from "@/lib/lagos";
import { activeStreak, hasProgress, loadSave, type DailyId, type Save } from "@/lib/storage";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const today = useMemo(() => lagosDate(), []);
  const [save, setSave] = useState<Save | null>(null);

  useEffect(() => {
    setSave(loadSave());
  }, []);

  const dailies = GAMES.filter((game) => game.daily);
  const arcade = GAMES.filter((game) => !game.daily);
  const streak = save ? activeStreak(save.visit, today) : 0;
  const solved = dailies.filter((game) => {
    const row = save?.dailies[game.slug as DailyId];
    return row?.date === today && row.won;
  }).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-16 pt-4">
      <TopBar />
      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-green">For the gap between customers</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="max-w-xl font-display text-4xl leading-none text-ink sm:text-5xl">Play a short one.</h1>
        <p className="text-sm text-muted">{lagosLabel(today)}</p>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Four daily puzzles, the same for every shop on Lagos time, plus Whot, Ayo, a market memory, and a till that checks your change.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-ink px-3 py-1.5 font-semibold text-paper">
          {streak > 0 ? `${streak}-day streak` : "Streak starts today"}
        </span>
        <span className="rounded-full bg-green-soft px-3 py-1.5 font-semibold text-green">{solved}/4 dailies solved</span>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Today</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {dailies.map((game) => (
            <GameCard key={game.slug} slug={game.slug} name={game.name} blurb={game.blurb} time={game.time} icon={game.icon} status={dailyStatus(game.slug as DailyId, today, save)} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Anytime</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {arcade.map((game) => (
            <GameCard key={game.slug} slug={game.slug} name={game.name} blurb={game.blurb} time={game.time} icon={game.icon} status={arcadeStatus(game.slug, save)} />
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        <p>
          Made for people who run shops on{" "}
          <a className="font-semibold text-ink underline" href="https://jktl.com.ng">
            JKTL
          </a>
          . Puzzles roll over at midnight in Lagos. Scores stay on this phone.
        </p>
      </footer>
    </main>
  );
}

function dailyStatus(id: DailyId, today: string, save: Save | null): string {
  const row = save?.dailies[id];
  if (row?.date === today && row.won) return "Solved";
  if (row?.date === today) return "Played";
  if (save && hasProgress(`${id}:${today}`)) return "In play";
  return "Today";
}

function arcadeStatus(slug: string, save: Save | null): string {
  if (!save) return "Play";
  if (slug === "whot") return save.arcade.whotGames ? `${save.arcade.whotWins} wins` : "Deal a hand";
  if (slug === "ayo") return save.arcade.ayoGames ? `${save.arcade.ayoWins} wins` : "Sow the seeds";
  if (slug === "memory") return save.arcade.memoryBest != null ? `Best ${save.arcade.memoryBest} moves` : "Flip the stall";
  if (slug === "till") return save.arcade.tillBest > 0 ? `Best ${save.arcade.tillBest}` : "Open the till";
  return "Play";
}

function GameCard({
  slug,
  name,
  blurb,
  time,
  icon: Icon,
  status,
}: {
  slug: string;
  name: string;
  blurb: string;
  time: string;
  icon: (typeof GAMES)[number]["icon"];
  status: string;
}) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug }}
      className="flex min-h-36 flex-col justify-between rounded-3xl border border-line bg-card p-4 text-ink shadow-sm transition active:scale-[0.99]"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-gold-soft text-ink">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-muted">{status}</span>
      </span>
      <span className="mt-4 block">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-display text-2xl leading-none">{name}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">{time}</span>
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-muted">{blurb}</span>
      </span>
    </Link>
  );
}
