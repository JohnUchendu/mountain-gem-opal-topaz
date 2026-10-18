import {
  Banknote,
  CircleDot,
  CircleHelp,
  Layers,
  LayoutGrid,
  Shapes,
  Shuffle,
  WholeWord,
  type LucideIcon,
} from "lucide-react";

export type GameMeta = {
  slug: string;
  name: string;
  blurb: string;
  time: string;
  icon: LucideIcon;
  daily: boolean;
};

export const GAMES: GameMeta[] = [
  {
    slug: "word-guess",
    name: "Word Guess",
    blurb: "Six tries for a five-letter shop word. Same word for every shop today.",
    time: "3 min",
    icon: WholeWord,
    daily: true,
  },
  {
    slug: "word-groups",
    name: "Word Groups",
    blurb: "Find four groups of four. Soups, markets, pidgin, and the till.",
    time: "4 min",
    icon: LayoutGrid,
    daily: true,
  },
  {
    slug: "scramble",
    name: "Scramble",
    blurb: "Untangle a Naija word before the next customer walks in.",
    time: "2 min",
    icon: Shuffle,
    daily: true,
  },
  {
    slug: "riddle",
    name: "Riddle",
    blurb: "A short clue. The answer is usually closer to the shop than you think.",
    time: "2 min",
    icon: CircleHelp,
    daily: true,
  },
  {
    slug: "whot",
    name: "Whot",
    blurb: "Shed your hand before the computer. Pick two, hold on, last card.",
    time: "5 min",
    icon: Shapes,
    daily: false,
  },
  {
    slug: "ayo",
    name: "Ayo",
    blurb: "Sow the seeds. Capture twos and threes. First to 25 takes the board.",
    time: "8 min",
    icon: CircleDot,
    daily: false,
  },
  {
    slug: "memory",
    name: "Market Memory",
    blurb: "Flip the stall and match the goods. Fewer moves, sharper memory.",
    time: "2 min",
    icon: Layers,
    daily: false,
  },
  {
    slug: "till",
    name: "Till Rush",
    blurb: "A customer paid with a note. Give the exact change before the minute goes.",
    time: "1 min",
    icon: Banknote,
    daily: false,
  },
];

export function gameBySlug(slug: string): GameMeta | undefined {
  return GAMES.find((game) => game.slug === slug);
}
