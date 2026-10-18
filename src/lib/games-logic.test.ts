import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { aiChoose, applyMove, initialAyo, legalMoves, NEXT, PREV, sow } from "../games/ayo.ts";
import { makeSale, sumDenoms } from "../games/till.ts";
import { buildDeck, canPlay, createWhot, playCard, type Card, type WhotState } from "../games/whot.ts";
import { GUESSES } from "./guesses.ts";
import { ANSWERS, GROUP_PUZZLES, matchGroup, RIDDLES, SCRAMBLES } from "./puzzles.ts";
import { scoreGuess } from "./score.ts";
import { markDaily, emptySave } from "./storage.ts";
import { daysBetween } from "./lagos.ts";

describe("word score", () => {
  it("marks correct, present, and absent letters", () => {
    assert.deepEqual(scoreGuess("TALON", "PLANT"), ["present", "present", "present", "absent", "present"]);
  });

  it("does not over-count duplicate letters", () => {
    assert.deepEqual(scoreGuess("ALLEY", "APPLE"), ["correct", "present", "absent", "present", "absent"]);
  });
});

describe("daily content", () => {
  it("only uses guessable five-letter answers", () => {
    for (const word of ANSWERS) {
      assert.equal(word.length, 5, word);
      assert.equal(GUESSES.has(word), true, word);
    }
    assert.equal(new Set(ANSWERS).size, ANSWERS.length);
  });

  it("builds fair group puzzles", () => {
    for (const puzzle of GROUP_PUZZLES) {
      assert.equal(puzzle.groups.length, 4);
      const seen = new Set<string>();
      for (const group of puzzle.groups) {
        assert.equal(group.words.length, 4);
        assert.ok(group.label.length > 1);
        for (const word of group.words) {
          assert.equal(seen.has(word), false, word);
          seen.add(word);
        }
      }
      const sample = puzzle.groups[0];
      assert.equal(matchGroup(puzzle, sample.words.slice().reverse())?.label, sample.label);
    }
  });

  it("has playable scrambles and riddles", () => {
    for (const item of SCRAMBLES) {
      assert.match(item.answer, /^[A-Z]{4,12}$/);
      assert.ok(item.hint.length > 8);
    }
    for (const item of RIDDLES) {
      assert.ok(item.prompt.endsWith("?"));
      assert.ok(item.answers.length > 0);
      assert.ok(item.hint.length > 3);
    }
  });
});

describe("ayo", () => {
  it("walks counterclockwise and back", () => {
    for (let pit = 0; pit < 12; pit++) {
      assert.equal(PREV[NEXT[pit]], pit);
      assert.equal(NEXT[PREV[pit]], pit);
    }
  });

  it("skips the starting pit when seeds loop", () => {
    const board = Array(12).fill(0);
    board[0] = 12;
    const result = sow(board, 0);
    assert.equal(result.path.includes(0), false);
    assert.equal(result.path.length, 12);
    assert.equal(result.board.reduce((sum, seeds) => sum + seeds, 0), 12);
  });

  it("captures a 2 and refuses a grand slam", () => {
    const board = Array(12).fill(0);
    board[5] = 1;
    board[11] = 1;
    board[6] = 1;
    const captured = applyMove(
      { board, store: [0, 0], turn: 0, over: false, winner: null, message: "" },
      5,
    );
    assert.equal(captured.state.store[0], 2);
    assert.equal(captured.state.board[11], 0);
    assert.equal(captured.state.board[6], 1);

    const slamBoard = Array(12).fill(0);
    slamBoard[0] = 4;
    slamBoard[5] = 1;
    slamBoard[11] = 1;
    const slam = applyMove(
      { board: slamBoard, store: [0, 0], turn: 0, over: false, winner: null, message: "" },
      5,
    );
    assert.equal(slam.state.over, false);
    assert.equal(slam.state.store[0], 0);
    assert.equal(slam.state.board[11], 2);
  });

  it("must feed an empty far row", () => {
    const board = Array(12).fill(0);
    board[0] = 1;
    board[5] = 3;
    const moves = legalMoves(board, 0);
    assert.deepEqual(moves, [5]);
  });

  it("picks a move quickly from the opening", () => {
    const started = Date.now();
    const move = aiChoose(initialAyo());
    assert.ok(move >= 6 && move <= 11);
    assert.ok(Date.now() - started < 800);
  });
});

describe("whot", () => {
  it("deals a 54-card deck", () => {
    const deck = buildDeck();
    assert.equal(deck.length, 54);
    assert.equal(new Set(deck.map((card) => card.id)).size, 54);
  });

  it("only allows a 2 while pick-two is live", () => {
    const state = blank();
    state.pending = 2;
    state.discard = [{ id: "circle-2", shape: "circle", rank: 2 }];
    assert.equal(canPlay({ id: "star-2", shape: "star", rank: 2 }, state), true);
    assert.equal(canPlay({ id: "whot-20-0", shape: "whot", rank: 20 }, state), false);
    const next = playCard(
      {
        ...state,
        player: [
          { id: "star-2", shape: "star", rank: 2 },
          { id: "star-3", shape: "star", rank: 3 },
        ],
      },
      "star-2",
      "player",
    );
    assert.equal(next.pending, 4);
    assert.equal(next.phase, "ai");
    assert.equal(next.player.length, 1);
  });

  it("gives the same player another turn on hold on", () => {
    const state = blank();
    state.discard = [{ id: "star-4", shape: "star", rank: 4 }];
    state.player = [
      { id: "star-1", shape: "star", rank: 1 },
      { id: "star-3", shape: "star", rank: 3 },
    ];
    const next = playCard(state, "star-1", "player");
    assert.equal(next.phase, "player");
    assert.equal(next.player.length, 1);
  });

  it("starts a full hand on the player's turn", () => {
    const state = createWhot(() => 0.42);
    assert.equal(state.player.length, 5);
    assert.equal(state.ai.length, 5);
    assert.equal(state.phase, "player");
    assert.equal(state.market.length + 1, 54 - 10);
  });
});

describe("till and streaks", () => {
  it("builds solvable change", () => {
    for (let i = 0; i < 200; i++) {
      const sale = makeSale(() => ((i * 17 + 3) % 100) / 100);
      assert.ok(sale.total > 0);
      assert.ok(sale.paid > sale.total);
      assert.equal((sale.paid - sale.total) % 5, 0);
    }
    assert.equal(sumDenoms([200, 50, 5]), 255);
  });

  it("keeps a daily streak without double counting", () => {
    const once = markDaily(emptySave(), "word-guess", "2026-10-16", true);
    const again = markDaily(once, "word-guess", "2026-10-16", true);
    const next = markDaily(again, "word-guess", "2026-10-17", true);
    assert.equal(again.streaks["word-guess"]?.current, 1);
    assert.equal(next.streaks["word-guess"]?.current, 2);
    assert.equal(next.visit.current, 2);
    assert.equal(daysBetween("2026-10-16", "2026-10-17"), 1);
  });
});

function blank(): WhotState {
  const card = (id: string, shape: Card["shape"], rank: number): Card => ({ id, shape, rank });
  return {
    market: [card("circle-3", "circle", 3)],
    discard: [card("circle-4", "circle", 4)],
    called: null,
    player: [],
    ai: [card("square-5", "square", 5)],
    phase: "player",
    pending: 0,
    passes: 0,
    winner: null,
    message: "",
    turn: 1,
  };
}
