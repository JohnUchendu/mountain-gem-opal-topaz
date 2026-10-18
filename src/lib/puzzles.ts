import { dateSeed, lagosDate, mulberry32, seededShuffle } from "./lagos.ts";

export type Tone = "gold" | "green" | "clay" | "ink";

export type Group = { label: string; tone: Tone; words: string[] };

export type GroupPuzzle = { groups: Group[] };

export type Riddle = { prompt: string; answers: string[]; hint: string };

export type Scramble = { answer: string; hint: string };

export const ANSWERS = [
  "LAGOS", "NAIRA", "ABUJA", "ENUGU", "BENIN", "GARRI", "AKARA", "DANFO", "OKADA", "IKEJA",
  "LEKKI", "APAPA", "ALABA", "WARRI", "AKURE", "KENTE", "HAUSA", "BREAD", "BEANS", "SUGAR",
  "HONEY", "MANGO", "GUAVA", "APPLE", "ONION", "WATER", "LIGHT", "METER", "TOKEN", "UNITS",
  "DISCO", "STOCK", "SALES", "PRICE", "QUEUE", "MADAM", "UNCLE", "AUNTY", "STAFF", "OWNER",
  "GUEST", "VISIT", "ORDER", "NOTES", "ALERT", "AGENT", "UNION", "FIRST", "WAGES", "TRADE",
  "BOOTH", "STALL", "SHELF", "GOODS", "WARES", "FLYER", "PROMO", "CLOSE", "SHIFT", "BREAK",
  "LUNCH", "CHIEF", "SERVE", "GREEN", "MOTOR", "ROUTE", "SALON", "BRAID", "RELAX", "CREAM",
  "BLADE", "CHAIR", "TABLE", "BROOM", "FLOOR", "PAINT", "BRAND", "PHONE", "TOPUP", "RENEW",
  "TAXES", "DOZEN", "CRATE", "KILOS", "SCALE", "FRESH", "STORE", "CLOTH", "SHIRT", "DRESS",
  "COINS", "SWEEP", "PAYEE", "REUSE",
];

export const GROUP_PUZZLES: GroupPuzzle[] = [
  {
    groups: [
      { tone: "gold", label: "Nigerian soups", words: ["EGUSI", "OGBONO", "AFANG", "BANGA"] },
      { tone: "green", label: "Swallows", words: ["EBA", "FUFU", "AMALA", "TUWO"] },
      { tone: "clay", label: "Drinks in the cooler", words: ["ZOBO", "KUNU", "MALT", "WATER"] },
      { tone: "ink", label: "Fried at the stall", words: ["DODO", "AKARA", "PUFFPUFF", "CHINCHIN"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Lagos rides", words: ["DANFO", "MOLUE", "OKADA", "KEKE"] },
      { tone: "green", label: "Hailed rides", words: ["UBER", "BOLT", "TAXI", "INDRIVE"] },
      { tone: "clay", label: "Go-slow words", words: ["HOLDUP", "TRAFFIC", "DIVERSION", "LASTMA"] },
      { tone: "ink", label: "Busy bus stops", words: ["OSHODI", "OBALENDE", "YABA", "BERGER"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "When light goes", words: ["GENERATOR", "CANDLE", "INVERTER", "SOLAR"] },
      { tone: "green", label: "Prepaid meter life", words: ["TOKEN", "UNITS", "METER", "DISCO"] },
      { tone: "clay", label: "How customers pay", words: ["CASH", "TRANSFER", "POS", "USSD"] },
      { tone: "ink", label: "What the phone brings", words: ["ALERT", "OTP", "AIRTIME", "DATA"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Party fabrics", words: ["ANKARA", "ASOOKE", "ADIRE", "LACE"] },
      { tone: "green", label: "What you wear with them", words: ["GELE", "FILA", "AGBADA", "BABANRIGA"] },
      { tone: "clay", label: "Owambe words", words: ["OWAMBE", "ASOEBI", "SPRAYING", "MC"] },
      { tone: "ink", label: "Tailor measurements", words: ["YARDS", "INCHES", "NECK", "WAIST"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Days the shutter opens", words: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"] },
      { tone: "green", label: "Papers you write", words: ["INVOICE", "RECEIPT", "QUOTATION", "WAYBILL"] },
      { tone: "clay", label: "People in the shop", words: ["OWNER", "CASHIER", "CUSTOMER", "APPRENTICE"] },
      { tone: "ink", label: "Before you lock up", words: ["SWEEP", "DISPLAY", "RESTOCK", "LOCKUP"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Nigerian cities", words: ["ABUJA", "KANO", "ENUGU", "KADUNA"] },
      { tone: "green", label: "Famous markets", words: ["BALOGUN", "ALABA", "ARIARIA", "KURMI"] },
      { tone: "clay", label: "Along the Lekki axis", words: ["LEKKI", "IKOYI", "AJAH", "EPE"] },
      { tone: "ink", label: "Abuja districts", words: ["WUSE", "GARKI", "JABI", "LUGBE"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Proteins on the fire", words: ["SUYA", "PONMO", "SHAKI", "CHICKEN"] },
      { tone: "green", label: "Tubers", words: ["YAM", "CASSAVA", "POTATO", "COCOYAM"] },
      { tone: "clay", label: "Grains in the sack", words: ["RICE", "MILLET", "MAIZE", "WHEAT"] },
      { tone: "ink", label: "Seasoning", words: ["MAGGI", "KNORR", "CURRY", "THYME"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Pidgin", words: ["WAHALA", "JAPA", "COMOT", "GIST"] },
      { tone: "green", label: "Yoruba courtesy", words: ["EKAARO", "EKALE", "ODABO", "ESE"] },
      { tone: "clay", label: "Igbo courtesy", words: ["KEDU", "DAALU", "NNO", "BIKO"] },
      { tone: "ink", label: "Hausa courtesy", words: ["SANNU", "NAGODE", "BARKA", "INAKWANA"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Naija national sides", words: ["EAGLES", "FALCONS", "FALCONETS", "EAGLETS"] },
      { tone: "green", label: "Club sides", words: ["ENYIMBA", "RANGERS", "PILLARS", "SHOOTING"] },
      { tone: "clay", label: "Positions", words: ["KEEPER", "STRIKER", "DEFENDER", "MIDFIELD"] },
      { tone: "ink", label: "Match day", words: ["WHISTLE", "PENALTY", "OFFSIDE", "CORNER"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Money leaving the shop", words: ["RENT", "DIESEL", "SALARY", "LEVY"] },
      { tone: "green", label: "Money arriving", words: ["SALES", "DEPOSIT", "TOPUP", "CREDIT"] },
      { tone: "clay", label: "Books you keep", words: ["LEDGER", "JOURNAL", "MINUTES", "REGISTER"] },
      { tone: "ink", label: "Parts of a shop day", words: ["OPENING", "RUSH", "LULL", "CLOSING"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Rooms in the house", words: ["PARLOUR", "KITCHEN", "STORE", "BALCONY"] },
      { tone: "green", label: "What dies first when light goes", words: ["FREEZER", "TELEVISION", "FAN", "DECODER"] },
      { tone: "clay", label: "Things you put on charge", words: ["PHONE", "LAMP", "CLIPPER", "SPEAKER"] },
      { tone: "ink", label: "Who knocks", words: ["TENANT", "LANDLORD", "NEIGHBOUR", "INLAW"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Stationery", words: ["PENCIL", "ERASER", "RULER", "SHARPENER"] },
      { tone: "green", label: "Provisions", words: ["MILK", "SUGAR", "SARDINE", "NOODLES"] },
      { tone: "clay", label: "School wear", words: ["UNIFORM", "SANDALS", "SOCKS", "BERET"] },
      { tone: "ink", label: "Break-time food", words: ["BUNS", "BISCUIT", "SWEET", "POPCORN"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "On the barbing chair", words: ["FADE", "SHAVE", "BEARD", "POWDER"] },
      { tone: "green", label: "Hair jobs", words: ["BRAIDS", "WIG", "ATTACHMENT", "RELAXER"] },
      { tone: "clay", label: "Tools on the counter", words: ["CLIPPER", "COMB", "SCISSORS", "MIRROR"] },
      { tone: "ink", label: "How they book you", words: ["BOOKING", "WALKIN", "DEPOSIT", "RETOUCH"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "Footwear", words: ["SANDALS", "SLIPPERS", "HEELS", "LOAFERS"] },
      { tone: "green", label: "Bags", words: ["HANDBAG", "BACKPACK", "CLUTCH", "DUFFEL"] },
      { tone: "clay", label: "Jewellery", words: ["EARRINGS", "CHAIN", "BANGLE", "RING"] },
      { tone: "ink", label: "On the makeup tray", words: ["LIPSTICK", "CREAM", "SPONGE", "MASCARA"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "News channels", words: ["NTA", "AIT", "CHANNELS", "ARISE"] },
      { tone: "green", label: "Apps on the phone", words: ["YOUTUBE", "NETFLIX", "SHOWMAX", "SPOTIFY"] },
      { tone: "clay", label: "What you watch or hear", words: ["MOVIE", "SKIT", "PODCAST", "NEWS"] },
      { tone: "ink", label: "On the remote", words: ["VOLUME", "MUTE", "REWIND", "PAUSE"] },
    ],
  },
  {
    groups: [
      { tone: "gold", label: "At the party", words: ["BRIDE", "GROOM", "USHERS", "ALAGA"] },
      { tone: "green", label: "People with the sound", words: ["DJ", "HYPEMAN", "PLAYLIST", "MC"] },
      { tone: "clay", label: "Food for guests", words: ["JOLLOF", "FRIEDRICE", "SMALLCHOPS", "PEPPERSOUP"] },
      { tone: "ink", label: "Guests take them home", words: ["SOUVENIR", "CUP", "PROGRAM", "TOTE"] },
    ],
  },
];

export const SCRAMBLES: Scramble[] = [
  { answer: "JOLLOF", hint: "The rice that can start a friendly argument" },
  { answer: "DANFO", hint: "Yellow bus, loud conductor" },
  { answer: "ANKARA", hint: "Print fabric for an owambe" },
  { answer: "GENERATOR", hint: "Starts singing when the light goes" },
  { answer: "INVOICE", hint: "A polite way to say please pay" },
  { answer: "CUSTOMER", hint: "The person the chair is waiting for" },
  { answer: "SUYA", hint: "Night meat, spice, and paper" },
  { answer: "OWAMBE", hint: "If there is a gele, you are probably here" },
  { answer: "BALOGUN", hint: "Lagos market where fabric goes to walk" },
  { answer: "OKADA", hint: "Two wheels through go-slow" },
  { answer: "EGUSI", hint: "Melon seeds, leaves, and a swallow" },
  { answer: "PLANTAIN", hint: "Ripe and fried, it becomes dodo" },
  { answer: "TRANSFER", hint: "Payment that should bring an alert" },
  { answer: "INVENTORY", hint: "The list that stops 'it has finished'" },
  { answer: "AGBADA", hint: "Flowing outfit with room for a speech" },
  { answer: "RECEIPT", hint: "Proof the money really landed" },
  { answer: "BOOKING", hint: "A customer claiming a time" },
  { answer: "WHATSAPP", hint: "Where half the orders actually start" },
  { answer: "ASOEBI", hint: "Cloth that says you belong to the party" },
  { answer: "MOLUE", hint: "The big old Lagos bus" },
  { answer: "GARRI", hint: "Soak it, or turn it into eba" },
  { answer: "CALABAR", hint: "A city people trust with a kitchen" },
  { answer: "PALMWINE", hint: "Tapped, sweet, and best the same day" },
  { answer: "DIESEL", hint: "What the generator drinks" },
  { answer: "BARBING", hint: "Fade, shave, powder, next" },
  { answer: "DEPOSIT", hint: "Money that holds the goods" },
  { answer: "AGEGE", hint: "The bread with a soft reputation" },
  { answer: "WAHALA", hint: "Trouble, but make it pidgin" },
];

export const RIDDLES: Riddle[] = [
  {
    prompt: "I arrive on a phone, I am not a call, and the shop gets loud when I land. What am I?",
    answers: ["bank alert", "alert", "credit alert", "transfer alert"],
    hint: "It usually follows a transfer.",
  },
  {
    prompt: "NEPA brings me, the generator rests when I come, and the freezer prays for me. What am I?",
    answers: ["light", "electricity", "power", "nepa", "up nepa"],
    hint: "People shout when I return.",
  },
  {
    prompt: "I am yellow, loud, and full of strangers going the same way. Miss me and you may trek. What am I?",
    answers: ["danfo", "bus", "molue"],
    hint: "A conductor is shouting my route.",
  },
  {
    prompt: "You buy me in yards, you wear me on owambe day, and my pattern tells a story. What am I?",
    answers: ["ankara", "lace", "aso oke", "asooke", "fabric", "cloth"],
    hint: "The tailor is already asking for your measurements.",
  },
  {
    prompt: "I have a neck but no head, and I usually wear a cap. Shops sell me cold. What am I?",
    answers: ["bottle", "a bottle"],
    hint: "Malt, coke, or water can live in me.",
  },
  {
    prompt: "Peel my outside, cook my inside, eat my outside, throw my inside away. What am I?",
    answers: ["corn", "maize", "corn on the cob"],
    hint: "Roasted or boiled, the cob stays.",
  },
  {
    prompt: "I have cities with no houses, forests with no trees, and water with no fish. What am I?",
    answers: ["map", "a map"],
    hint: "You can fold me.",
  },
  {
    prompt: "The more you take from me, the bigger I get. What am I?",
    answers: ["hole", "a hole", "pit"],
    hint: "A well starts as me.",
  },
  {
    prompt: "What belongs to you, but other people use it more than you do?",
    answers: ["your name", "name", "my name"],
    hint: "Customers say it when they greet you.",
  },
  {
    prompt: "I have a thumb and four fingers but I am not alive. What am I?",
    answers: ["glove", "a glove"],
    hint: "A tailor or a cook may wear me.",
  },
  {
    prompt: "What has words but never speaks?",
    answers: ["book", "a book"],
    hint: "It can be a ledger too.",
  },
  {
    prompt: "I am full of keys but I cannot open your shop door. What am I?",
    answers: ["keyboard", "piano", "a keyboard", "a piano"],
    hint: "One answer sits on a laptop. The other sits in church.",
  },
  {
    prompt: "What runs around the compound but never moves?",
    answers: ["fence", "a fence", "wall", "a wall"],
    hint: "The gate is cut into me.",
  },
  {
    prompt: "Two fathers and two sons go to the market and buy three agbadas, one each. How many people went?",
    answers: ["3", "three", "three people"],
    hint: "A grandfather, a father, and a son.",
  },
  {
    prompt: "I sit in the shop all month and only speak when something is running low. What am I?",
    answers: ["inventory", "stock", "stock list", "inventory list"],
    hint: "JKTL keeps me so you do not guess.",
  },
  {
    prompt: "What is always in front of you at the shop, but you can never see it?",
    answers: ["the future", "future", "tomorrow"],
    hint: "Tomorrow's customers live here.",
  },
  {
    prompt: "I fly without wings. I cry without eyes. When I visit, light often leaves. What am I?",
    answers: ["rain", "cloud", "a cloud", "the rain"],
    hint: "The compound smells like earth after me.",
  },
  {
    prompt: "What gets wetter the more it dries?",
    answers: ["towel", "a towel"],
    hint: "It hangs behind the salon chair.",
  },
  {
    prompt: "I have an eye but I cannot see. A tailor cannot finish without me. What am I?",
    answers: ["needle", "a needle"],
    hint: "Thread knows me well.",
  },
  {
    prompt: "You can pay me, fold me, and still lose me in a receipt book. Customers argue if I do not match. What am I?",
    answers: ["change", "balance", "the change"],
    hint: "The till game is named after me.",
  },
];

function pick(date: string, salt: string, length: number): number {
  return dateSeed(`${date}:${salt}`) % length;
}

export function dailyAnswer(date = lagosDate()): string {
  return ANSWERS[pick(date, "guess", ANSWERS.length)];
}

export function dailyGroups(date = lagosDate()): { puzzle: GroupPuzzle; words: string[] } {
  const puzzle = GROUP_PUZZLES[pick(date, "groups", GROUP_PUZZLES.length)];
  const words = seededShuffle(
    puzzle.groups.flatMap((group) => group.words),
    dateSeed(`${date}:group-order`),
  );
  return { puzzle, words };
}

export function matchGroup(puzzle: GroupPuzzle, words: string[]): Group | null {
  const key = words.map((word) => word.toUpperCase()).sort().join("|");
  return puzzle.groups.find((group) => group.words.slice().sort().join("|") === key) ?? null;
}

export function oneAway(puzzle: GroupPuzzle, words: string[]): boolean {
  return puzzle.groups.some((group) => {
    const set = new Set(group.words);
    return words.filter((word) => set.has(word)).length === 3;
  });
}

export function dailyScramble(date = lagosDate()): { puzzle: Scramble; letters: string } {
  const puzzle = SCRAMBLES[pick(date, "scramble", SCRAMBLES.length)];
  const rnd = mulberry32(dateSeed(`${date}:scramble-letters`));
  const chars = puzzle.answer.split("");
  let letters = puzzle.answer;
  for (let guard = 0; guard < 8 && letters === puzzle.answer; guard++) {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    letters = chars.join("");
  }
  if (letters === puzzle.answer && letters.length > 1) {
    letters = letters.slice(1) + letters[0];
  }
  return { puzzle, letters };
}

export function dailyRiddle(date = lagosDate()): Riddle {
  return RIDDLES[pick(date, "riddle", RIDDLES.length)];
}
