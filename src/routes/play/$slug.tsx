import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AyoBoard } from "@/components/games/ayo-board";
import { MemoryBoard } from "@/components/games/memory-board";
import { Riddle } from "@/components/games/riddle";
import { Scramble } from "@/components/games/scramble";
import { TillBoard } from "@/components/games/till-board";
import { WhotBoard } from "@/components/games/whot-board";
import { WordGroups } from "@/components/games/word-groups";
import { WordGuess } from "@/components/games/word-guess";
import { gameBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/play/$slug")({
  component: Play,
});

function Play() {
  const { slug } = Route.useParams();
  const game = gameBySlug(slug);

  useEffect(() => {
    document.title = game ? `${game.name} · JKTL Games` : "JKTL Games";
  }, [game]);

  if (slug === "word-guess") return <WordGuess />;
  if (slug === "word-groups") return <WordGroups />;
  if (slug === "scramble") return <Scramble />;
  if (slug === "riddle") return <Riddle />;
  if (slug === "whot") return <WhotBoard />;
  if (slug === "ayo") return <AyoBoard />;
  if (slug === "memory") return <MemoryBoard />;
  if (slug === "till") return <TillBoard />;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 text-ink">
      <h1 className="font-display text-4xl">That game is not on the shelf.</h1>
      <Link to="/" className="mt-4 font-semibold text-green">
        Back to all games
      </Link>
    </main>
  );
}
