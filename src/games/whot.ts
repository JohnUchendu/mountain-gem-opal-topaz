export type Shape = "circle" | "triangle" | "cross" | "square" | "star";
export type Who = "player" | "ai";

export type Card = {
  id: string;
  shape: Shape | "whot";
  rank: number;
};

export type Phase = "player" | "declare" | "ai" | "over";

export type WhotState = {
  market: Card[];
  discard: Card[];
  called: Shape | null;
  player: Card[];
  ai: Card[];
  phase: Phase;
  pending: number;
  passes: number;
  winner: Who | "draw" | null;
  message: string;
  turn: number;
};

export const SHAPES: Shape[] = ["circle", "triangle", "cross", "square", "star"];

const SPEC: [Shape, number[]][] = [
  ["circle", [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14]],
  ["triangle", [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14]],
  ["cross", [1, 2, 3, 5, 7, 10, 11, 13, 14]],
  ["square", [1, 2, 3, 5, 7, 10, 11, 13, 14]],
  ["star", [1, 2, 3, 4, 5, 7, 8]],
];

export function shapeLabel(shape: Shape | "whot"): string {
  if (shape === "whot") return "Whot";
  return shape.charAt(0).toUpperCase() + shape.slice(1);
}

export function buildDeck(): Card[] {
  const cards: Card[] = [];
  for (const [shape, ranks] of SPEC) {
    for (const rank of ranks) cards.push({ id: `${shape}-${rank}`, shape, rank });
  }
  for (let i = 0; i < 5; i++) cards.push({ id: `whot-20-${i}`, shape: "whot", rank: 20 });
  return cards;
}

export function shuffle<T>(items: readonly T[], rnd: () => number = Math.random): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function topOf(state: WhotState): Card | undefined {
  return state.discard[state.discard.length - 1];
}

export function canPlay(card: Card, state: WhotState): boolean {
  if (state.pending > 0) return card.rank === 2;
  const top = topOf(state);
  if (!top) return true;
  if (card.shape === "whot") return true;
  if (top.shape === "whot") return state.called ? card.shape === state.called : true;
  return card.shape === top.shape || card.rank === top.rank;
}

export function legalCards(state: WhotState, who: Who): Card[] {
  return state[who].filter((card) => canPlay(card, state));
}

function drawN(state: WhotState, count: number): { market: Card[]; discard: Card[]; cards: Card[] } {
  const market = state.market.slice();
  const discard = state.discard.slice();
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    if (market.length === 0) {
      if (discard.length <= 1) break;
      const top = discard[discard.length - 1];
      const rest = shuffle(discard.slice(0, -1));
      market.push(...rest);
      discard.length = 0;
      discard.push(top);
    }
    const card = market.pop();
    if (!card) break;
    cards.push(card);
  }
  return { market, discard, cards };
}

function opponent(who: Who): Who {
  return who === "player" ? "ai" : "player";
}

function passTo(state: WhotState, who: Who, message: string): WhotState {
  return {
    ...state,
    phase: who === "ai" ? "ai" : "player",
    message: message || state.message,
    turn: state.turn + 1,
  };
}

function bestShape(hand: Card[]): Shape {
  const counts = new Map<Shape, number>(SHAPES.map((shape) => [shape, 0]));
  for (const card of hand) {
    if (card.shape !== "whot") counts.set(card.shape, (counts.get(card.shape) ?? 0) + 1);
  }
  return SHAPES.slice().sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0))[0];
}

function finishByCount(state: WhotState): WhotState {
  const player = state.player.length;
  const ai = state.ai.length;
  const winner = player === ai ? "draw" : player < ai ? "player" : "ai";
  const message =
    winner === "draw" ? "Market locked. It is a draw." : winner === "player" ? "Market locked. You had fewer cards." : "Market locked. Computer had fewer cards.";
  return { ...state, phase: "over", winner, message, turn: state.turn + 1 };
}

function afterPlay(state: WhotState, card: Card, who: Who): WhotState {
  if (state[who].length === 0) {
    return {
      ...state,
      phase: "over",
      winner: who,
      message: who === "player" ? "You cleared your hand." : "Computer cleared its hand.",
      turn: state.turn + 1,
    };
  }
  const other = opponent(who);
  if (card.rank === 2) {
    return passTo({ ...state, pending: state.pending + 2, called: null }, other, "Pick two.");
  }
  if (card.rank === 1) return passTo({ ...state, called: null }, who, "Hold on. Play again.");
  if (card.rank === 8) return passTo({ ...state, called: null }, who, "Suspension. Play again.");
  if (card.rank === 14) {
    const drawn = drawN(state, 1);
    const next: WhotState = {
      ...state,
      market: drawn.market,
      discard: drawn.discard,
      called: null,
      player: who === "ai" ? [...state.player, ...drawn.cards] : state.player,
      ai: who === "player" ? [...state.ai, ...drawn.cards] : state.ai,
    };
    return passTo(next, other, "General market. One card, then play.");
  }
  if (card.shape === "whot") {
    if (who === "ai") {
      const shape = bestShape(state.ai);
      return passTo({ ...state, called: shape }, "player", `Computer called ${shapeLabel(shape)}.`);
    }
    return { ...state, phase: "declare", called: null, message: "Call the next shape.", turn: state.turn + 1 };
  }
  return passTo({ ...state, called: null }, other, who === "player" ? "Computer's turn." : "Your turn.");
}

export function playCard(state: WhotState, id: string, who: Who): WhotState {
  if (state.phase === "over" || state.phase === "declare") return state;
  if (who === "player" && state.phase !== "player") return state;
  if (who === "ai" && state.phase !== "ai") return state;
  const hand = state[who];
  const card = hand.find((item) => item.id === id);
  if (!card || !canPlay(card, state)) return state;
  const nextHand = hand.filter((item) => item.id !== id);
  const message = nextHand.length === 1 ? (who === "player" ? "Last card!" : "Computer says last card.") : "";
  const next: WhotState = {
    ...state,
    player: who === "player" ? nextHand : state.player,
    ai: who === "ai" ? nextHand : state.ai,
    discard: [...state.discard, card],
    passes: 0,
    message,
  };
  return afterPlay(next, card, who);
}

export function declareShape(state: WhotState, shape: Shape): WhotState {
  if (state.phase !== "declare") return state;
  return passTo({ ...state, called: shape }, "ai", `You called ${shapeLabel(shape)}.`);
}

export function takeMarket(state: WhotState, who: Who): WhotState {
  if (state.phase === "over" || state.phase === "declare") return state;
  if (who === "player" && state.phase !== "player") return state;
  if (who === "ai" && state.phase !== "ai") return state;
  const other = opponent(who);
  if (state.pending > 0) {
    const drawn = drawN(state, state.pending);
    const next: WhotState = {
      ...state,
      market: drawn.market,
      discard: drawn.discard,
      pending: 0,
      passes: 0,
      player: who === "player" ? [...state.player, ...drawn.cards] : state.player,
      ai: who === "ai" ? [...state.ai, ...drawn.cards] : state.ai,
    };
    return passTo(next, other, `Picked ${drawn.cards.length}.`);
  }
  const drawn = drawN(state, 1);
  if (drawn.cards.length === 0) {
    const passes = state.passes + 1;
    if (passes >= 2) return finishByCount({ ...state, passes });
    return passTo({ ...state, passes }, other, "Market is dry.");
  }
  const card = drawn.cards[0];
  const holding: WhotState = {
    ...state,
    market: drawn.market,
    discard: drawn.discard,
    passes: 0,
    player: who === "player" ? [...state.player, card] : state.player,
    ai: who === "ai" ? [...state.ai, card] : state.ai,
    message: who === "player" ? "You went to market." : "Computer went to market.",
  };
  if (canPlay(card, holding)) return playCard(holding, card.id, who);
  return passTo(holding, other, holding.message);
}

function aiScore(state: WhotState, card: Card): number {
  const hand = state.ai;
  let score = card.rank / 30;
  if (hand.length === 1) score += 50;
  if (hand.length === 2 && card.shape !== "whot") score += 6;
  if (card.shape === "whot") score += legalCards(state, "ai").length === 1 ? 8 : -4;
  if ((card.rank === 2 || card.rank === 1 || card.rank === 8) && state.player.length <= 3) score += 4;
  const followers = hand.filter((item) => item.id !== card.id && item.shape === card.shape).length;
  score += followers * 2;
  return score;
}

export function aiAct(state: WhotState): WhotState {
  if (state.phase !== "ai") return state;
  const legal = legalCards(state, "ai");
  if (legal.length === 0) return takeMarket(state, "ai");
  const card = legal.slice().sort((a, b) => aiScore(state, b) - aiScore(state, a))[0];
  return playCard(state, card.id, "ai");
}

export function createWhot(rnd: () => number = Math.random): WhotState {
  const deck = shuffle(buildDeck(), rnd);
  const player = deck.splice(0, 5);
  const ai = deck.splice(0, 5);
  const first = deck.pop();
  if (!first) throw new Error("Deck was empty");
  const called = first.shape === "whot" ? "circle" : null;
  return {
    market: deck,
    discard: [first],
    called,
    player,
    ai,
    phase: "player",
    pending: 0,
    passes: 0,
    winner: null,
    message: first.shape === "whot" ? "Market opened on Whot and called Circle." : "Your turn. Match shape or number.",
    turn: 1,
  };
}
