export type Mark = "correct" | "present" | "absent";

export function scoreGuess(guess: string, answer: string): Mark[] {
  const g = guess.toUpperCase();
  const a = answer.toUpperCase();
  const marks: Mark[] = Array(g.length).fill("absent");
  const left: number[] = [];
  const counts = new Map<string, number>();

  for (let i = 0; i < a.length; i++) {
    if (g[i] === a[i]) marks[i] = "correct";
    else left.push(i);
  }
  for (let i = 0; i < a.length; i++) {
    if (marks[i] !== "correct") counts.set(a[i], (counts.get(a[i]) ?? 0) + 1);
  }
  for (const i of left) {
    const n = counts.get(g[i]) ?? 0;
    if (n > 0) {
      marks[i] = "present";
      counts.set(g[i], n - 1);
    }
  }
  return marks;
}

export function loose(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(a|an|the|some|my) /, "");
}
