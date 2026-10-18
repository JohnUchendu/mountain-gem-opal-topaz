export const DENOMS = [1000, 500, 200, 100, 50, 20, 10, 5] as const;

const NAMES = [
  "Mama Ngozi",
  "Uncle Tunde",
  "Aunty Bola",
  "Chinedu",
  "Hajiya Amina",
  "Oga Emeka",
  "Sisi Lola",
  "Baba Sule",
  "Amaka",
  "Ibrahim",
  "Nneka",
  "Mr Ade",
  "Zainab",
  "Tosin",
  "Ejiro",
];

const ITEMS = [
  "2 yards of ankara",
  "a bag of rice",
  "suya and bread",
  "relaxer and a wig",
  "a charger and water",
  "agege bread and eggs",
  "diesel in a keg",
  "three exercise books",
  "palm oil and maggi",
  "a fade and beard",
  "provisions for the week",
  "one crate of eggs",
  "school sandals",
  "data print and a charger",
  "jollof and zobo",
];

export type Sale = {
  name: string;
  item: string;
  total: number;
  paid: number;
};

export function naira(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function makeSale(rnd: () => number = Math.random): Sale {
  const notes = [500, 1000, 2000, 5000, 10000];
  const paid = notes[Math.floor(rnd() * notes.length)];
  const maxChange = Math.min(paid - 100, 3500);
  const steps = Math.max(1, Math.floor(maxChange / 5));
  let change = 5 * (1 + Math.floor(rnd() * steps));
  if (change >= paid) change = Math.max(5, paid - 50);
  change -= change % 5;
  if (change < 5) change = 5;
  return {
    name: NAMES[Math.floor(rnd() * NAMES.length)],
    item: ITEMS[Math.floor(rnd() * ITEMS.length)],
    total: paid - change,
    paid,
  };
}

export function sumDenoms(denoms: readonly number[]): number {
  return denoms.reduce((sum, value) => sum + value, 0);
}
