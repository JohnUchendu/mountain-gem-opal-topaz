import { daysBetween } from "./lagos.ts";

const SAVE_KEY = "jktl-games-v1";
const PROGRESS_KEY = "jktl-progress-v1";

export type DailyId = "word-guess" | "word-groups" | "scramble" | "riddle";

export type Streak = { current: number; best: number; lastDate: string };

export type Save = {
  version: 1;
  dailies: Partial<Record<DailyId, { date: string; won: boolean }>>;
  streaks: Partial<Record<DailyId, Streak>>;
  visit: Streak;
  arcade: {
    whotWins: number;
    whotGames: number;
    ayoWins: number;
    ayoGames: number;
    memoryBest: number | null;
    tillBest: number;
  };
};

export function emptySave(): Save {
  return {
    version: 1,
    dailies: {},
    streaks: {},
    visit: { current: 0, best: 0, lastDate: "" },
    arcade: {
      whotWins: 0,
      whotGames: 0,
      ayoWins: 0,
      ayoGames: 0,
      memoryBest: null,
      tillBest: 0,
    },
  };
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return emptySave();
    const parsed = JSON.parse(raw) as Save;
    if (parsed.version !== 1 || !parsed.arcade || !parsed.visit) return emptySave();
    return parsed;
  } catch {
    return emptySave();
  }
}

export function saveSave(save: Save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* private mode */
  }
}

export function markDaily(save: Save, game: DailyId, date: string, won: boolean): Save {
  const previous = save.dailies[game];
  const wonToday = won || (previous?.date === date && previous.won);
  const next: Save = {
    ...save,
    dailies: { ...save.dailies, [game]: { date, won: wonToday } },
  };
  if (!wonToday) return next;

  const streak = save.streaks[game];
  let current = 1;
  if (streak?.lastDate === date) current = streak.current;
  else if (streak && daysBetween(streak.lastDate, date) === 1) current = streak.current + 1;
  const best = Math.max(current, streak?.best ?? 0);

  const visit = save.visit;
  let visitCurrent = 1;
  if (visit.lastDate === date) visitCurrent = Math.max(visit.current, 1);
  else if (daysBetween(visit.lastDate, date) === 1) visitCurrent = visit.current + 1;

  return {
    ...next,
    streaks: { ...save.streaks, [game]: { current, best, lastDate: date } },
    visit: {
      current: visitCurrent,
      best: Math.max(visit.best, visitCurrent),
      lastDate: date,
    },
  };
}

export function activeStreak(streak: Streak | undefined, today: string): number {
  if (!streak?.lastDate) return 0;
  const gap = daysBetween(streak.lastDate, today);
  if (gap === 0 || gap === 1) return streak.current;
  return 0;
}

type ProgressMap = Record<string, unknown>;

function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function loadProgress<T>(key: string): T | null {
  const value = readProgress()[key];
  return value == null ? null : (value as T);
}

export function saveProgress(key: string, value: unknown) {
  try {
    const all = readProgress();
    all[key] = value;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

export function hasProgress(key: string): boolean {
  return readProgress()[key] != null;
}
