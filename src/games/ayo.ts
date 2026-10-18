export type Side = 0 | 1;

export type AyoState = {
  board: number[];
  store: [number, number];
  turn: Side;
  over: boolean;
  winner: "player" | "ai" | "draw" | null;
  message: string;
};

export const NEXT = [1, 2, 3, 4, 5, 11, 0, 6, 7, 8, 9, 10];
export const PREV = [6, 0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 5];

export function ownPits(side: Side): number[] {
  return side === 0 ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11];
}

export function opponentPits(side: Side): number[] {
  return side === 0 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
}

export function initialAyo(): AyoState {
  return {
    board: Array(12).fill(4),
    store: [0, 0],
    turn: 0,
    over: false,
    winner: null,
    message: "Your pits are the near row. Sow to the right.",
  };
}

export function sow(board: readonly number[], index: number): { board: number[]; last: number; path: number[] } {
  const next = board.slice();
  let seeds = next[index];
  next[index] = 0;
  const path: number[] = [];
  let cursor = index;
  while (seeds > 0) {
    cursor = NEXT[cursor];
    if (cursor === index) continue;
    next[cursor] += 1;
    seeds -= 1;
    path.push(cursor);
  }
  return { board: next, last: path[path.length - 1] ?? index, path };
}

export function feeds(board: readonly number[], index: number, side: Side): boolean {
  if (board[index] <= 0) return false;
  const opp = new Set(opponentPits(side));
  return sow(board, index).path.some((pit) => opp.has(pit));
}

export function legalMoves(board: readonly number[], side: Side): number[] {
  const mine = ownPits(side).filter((pit) => board[pit] > 0);
  const oppEmpty = opponentPits(side).every((pit) => board[pit] === 0);
  if (!oppEmpty) return mine;
  return mine.filter((pit) => feeds(board, pit, side));
}

function winnerFrom(store: [number, number]): AyoState["winner"] {
  if (store[0] === store[1]) return "draw";
  return store[0] > store[1] ? "player" : "ai";
}

export function applyMove(state: AyoState, index: number): { state: AyoState; path: number[] } {
  const legal = legalMoves(state.board, state.turn);
  if (state.over || !legal.includes(index)) return { state, path: [] };
  const sown = sow(state.board, index);
  const board = sown.board;
  const side = state.turn;
  const opp = new Set(opponentPits(side));
  let captured = 0;
  if (opp.has(sown.last) && (board[sown.last] === 2 || board[sown.last] === 3)) {
    const chain: number[] = [];
    let cursor = sown.last;
    while (opp.has(cursor) && (board[cursor] === 2 || board[cursor] === 3)) {
      chain.push(cursor);
      cursor = PREV[cursor];
    }
    const oppTotal = opponentPits(side).reduce((sum, pit) => sum + board[pit], 0);
    const taken = chain.reduce((sum, pit) => sum + board[pit], 0);
    if (taken < oppTotal) {
      for (const pit of chain) {
        captured += board[pit];
        board[pit] = 0;
      }
    }
  }
  const store: [number, number] = [state.store[0], state.store[1]];
  store[side] += captured;
  const nextTurn: Side = side === 0 ? 1 : 0;

  if (store[0] >= 25 || store[1] >= 25) {
    const winner = winnerFrom(store);
    return {
      path: sown.path,
      state: {
        board,
        store,
        turn: nextTurn,
        over: true,
        winner,
        message: winner === "player" ? "You reached 25 seeds." : winner === "ai" ? "Computer reached 25 seeds." : "Level at the finish.",
      },
    };
  }

  if (legalMoves(board, nextTurn).length === 0) {
    const finalStore: [number, number] = [
      store[0] + ownPits(0).reduce((sum, pit) => sum + board[pit], 0),
      store[1] + ownPits(1).reduce((sum, pit) => sum + board[pit], 0),
    ];
    const winner = winnerFrom(finalStore);
    return {
      path: sown.path,
      state: {
        board: Array(12).fill(0),
        store: finalStore,
        turn: nextTurn,
        over: true,
        winner,
        message:
          winner === "draw"
            ? "No move left. The board is level."
            : winner === "player"
              ? "No move left. The last seeds are yours."
              : "No move left. Computer takes the last seeds.",
      },
    };
  }

  return {
    path: sown.path,
    state: {
      board,
      store,
      turn: nextTurn,
      over: false,
      winner: null,
      message: captured ? `Captured ${captured}.` : side === 0 ? "Sown. Computer plays next." : "Your turn.",
    },
  };
}

function evaluate(state: AyoState): number {
  if (state.over) return (state.store[1] - state.store[0]) * 100;
  const aiSeeds = ownPits(1).reduce((sum, pit) => sum + state.board[pit], 0);
  const playerSeeds = ownPits(0).reduce((sum, pit) => sum + state.board[pit], 0);
  return (state.store[1] - state.store[0]) * 12 + (aiSeeds - playerSeeds) * 0.15 + legalMoves(state.board, 1).length * 0.4 - legalMoves(state.board, 0).length * 0.4;
}

function search(state: AyoState, depth: number, alpha: number, beta: number, nodes: { n: number }): number {
  if (state.over || depth === 0 || nodes.n > 25000) return evaluate(state);
  const moves = legalMoves(state.board, state.turn);
  if (moves.length === 0) return evaluate({ ...state, over: true });
  if (state.turn === 1) {
    let best = -Infinity;
    for (const move of moves) {
      nodes.n += 1;
      const value = search(applyMove(state, move).state, depth - 1, alpha, beta, nodes);
      best = Math.max(best, value);
      alpha = Math.max(alpha, best);
      if (alpha >= beta) break;
    }
    return best;
  }
  let best = Infinity;
  for (const move of moves) {
    nodes.n += 1;
    const value = search(applyMove(state, move).state, depth - 1, alpha, beta, nodes);
    best = Math.min(best, value);
    beta = Math.min(beta, best);
    if (alpha >= beta) break;
  }
  return best;
}

export function aiChoose(state: AyoState): number {
  const moves = legalMoves(state.board, 1);
  if (moves.length === 0) return -1;
  let bestMove = moves[0];
  let bestValue = -Infinity;
  const nodes = { n: 0 };
  for (const move of moves) {
    const value = search(applyMove(state, move).state, 4, -Infinity, Infinity, nodes);
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }
  return bestMove;
}
