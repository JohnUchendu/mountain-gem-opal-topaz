import { i as __toESM } from "./_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { f as Flame, g as Delete, h as Droplets, l as Package, m as Egg, n as Wheat, p as Fish, s as Shirt, x as Apple } from "./_libs/lucide-react.mjs";
import { n as Route } from "./_ssr/router-CuxX8b1k.mjs";
import { a as dateSeed, c as lagosDate, d as loadSave, f as markDaily, g as seededShuffle, h as saveSave, i as blip, l as lagosLabel, m as saveProgress, n as TopBar, o as gameBySlug, p as mulberry32, u as loadProgress } from "./_ssr/top-bar-B0mcagb-.mjs";
import { t as clsx } from "./_libs/clsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DaMwS_Xl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VARIANTS = {
	solid: "bg-ink text-paper",
	line: "border border-line bg-card text-ink",
	green: "bg-green text-paper",
	ghost: "bg-transparent text-ink"
};
function Btn({ variant = "solid", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: clsx("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-40", VARIANTS[variant], className),
		...props
	});
}
function GameFrame({ kicker, title, help, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen w-full max-w-3xl px-4 pb-16 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { back: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs font-semibold uppercase tracking-widest text-green",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl leading-tight text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4 rounded-2xl border border-line bg-card px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "flex min-h-11 items-center font-semibold text-ink",
					children: "How to play"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-4 text-sm leading-relaxed text-muted",
					children: help
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children
			})
		]
	});
}
function WinNote({ title, text, onShare, copied }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-2xl bg-green-soft px-4 py-4 text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl leading-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed",
				children: text
			}),
			onShare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-3",
				onClick: onShare,
				children: copied ? "Copied" : "Share result"
			}) : null
		]
	});
}
var NEXT = [
	1,
	2,
	3,
	4,
	5,
	11,
	0,
	6,
	7,
	8,
	9,
	10
];
var PREV = [
	6,
	0,
	1,
	2,
	3,
	4,
	7,
	8,
	9,
	10,
	11,
	5
];
function ownPits(side) {
	return side === 0 ? [
		0,
		1,
		2,
		3,
		4,
		5
	] : [
		6,
		7,
		8,
		9,
		10,
		11
	];
}
function opponentPits(side) {
	return side === 0 ? [
		6,
		7,
		8,
		9,
		10,
		11
	] : [
		0,
		1,
		2,
		3,
		4,
		5
	];
}
function initialAyo() {
	return {
		board: Array(12).fill(4),
		store: [0, 0],
		turn: 0,
		over: false,
		winner: null,
		message: "Your pits are the near row. Sow to the right."
	};
}
function sow(board, index) {
	const next = board.slice();
	let seeds = next[index];
	next[index] = 0;
	const path = [];
	let cursor = index;
	while (seeds > 0) {
		cursor = NEXT[cursor];
		if (cursor === index) continue;
		next[cursor] += 1;
		seeds -= 1;
		path.push(cursor);
	}
	return {
		board: next,
		last: path[path.length - 1] ?? index,
		path
	};
}
function feeds(board, index, side) {
	if (board[index] <= 0) return false;
	const opp = new Set(opponentPits(side));
	return sow(board, index).path.some((pit) => opp.has(pit));
}
function legalMoves(board, side) {
	const mine = ownPits(side).filter((pit) => board[pit] > 0);
	if (!opponentPits(side).every((pit) => board[pit] === 0)) return mine;
	return mine.filter((pit) => feeds(board, pit, side));
}
function winnerFrom(store) {
	if (store[0] === store[1]) return "draw";
	return store[0] > store[1] ? "player" : "ai";
}
function applyMove(state, index) {
	const legal = legalMoves(state.board, state.turn);
	if (state.over || !legal.includes(index)) return {
		state,
		path: []
	};
	const sown = sow(state.board, index);
	const board = sown.board;
	const side = state.turn;
	const opp = new Set(opponentPits(side));
	let captured = 0;
	if (opp.has(sown.last) && (board[sown.last] === 2 || board[sown.last] === 3)) {
		const chain = [];
		let cursor = sown.last;
		while (opp.has(cursor) && (board[cursor] === 2 || board[cursor] === 3)) {
			chain.push(cursor);
			cursor = PREV[cursor];
		}
		const oppTotal = opponentPits(side).reduce((sum, pit) => sum + board[pit], 0);
		if (chain.reduce((sum, pit) => sum + board[pit], 0) < oppTotal) for (const pit of chain) {
			captured += board[pit];
			board[pit] = 0;
		}
	}
	const store = [state.store[0], state.store[1]];
	store[side] += captured;
	const nextTurn = side === 0 ? 1 : 0;
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
				message: winner === "player" ? "You reached 25 seeds." : winner === "ai" ? "Computer reached 25 seeds." : "Level at the finish."
			}
		};
	}
	if (legalMoves(board, nextTurn).length === 0) {
		const finalStore = [store[0] + ownPits(0).reduce((sum, pit) => sum + board[pit], 0), store[1] + ownPits(1).reduce((sum, pit) => sum + board[pit], 0)];
		const winner = winnerFrom(finalStore);
		return {
			path: sown.path,
			state: {
				board: Array(12).fill(0),
				store: finalStore,
				turn: nextTurn,
				over: true,
				winner,
				message: winner === "draw" ? "No move left. The board is level." : winner === "player" ? "No move left. The last seeds are yours." : "No move left. Computer takes the last seeds."
			}
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
			message: captured ? `Captured ${captured}.` : side === 0 ? "Sown. Computer plays next." : "Your turn."
		}
	};
}
function evaluate(state) {
	if (state.over) return (state.store[1] - state.store[0]) * 100;
	const aiSeeds = ownPits(1).reduce((sum, pit) => sum + state.board[pit], 0);
	const playerSeeds = ownPits(0).reduce((sum, pit) => sum + state.board[pit], 0);
	return (state.store[1] - state.store[0]) * 12 + (aiSeeds - playerSeeds) * .15 + legalMoves(state.board, 1).length * .4 - legalMoves(state.board, 0).length * .4;
}
function search(state, depth, alpha, beta, nodes) {
	if (state.over || depth === 0 || nodes.n > 25e3) return evaluate(state);
	const moves = legalMoves(state.board, state.turn);
	if (moves.length === 0) return evaluate({
		...state,
		over: true
	});
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
function aiChoose(state) {
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
function wait(ms) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}
function AyoBoard() {
	const [view, setView] = (0, import_react.useState)(() => initialAyo());
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [hot, setHot] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [record, setRecord] = (0, import_react.useState)({
		wins: 0,
		games: 0
	});
	const viewRef = (0, import_react.useRef)(view);
	const busyRef = (0, import_react.useRef)(false);
	const filed = (0, import_react.useRef)(0);
	const gameRef = (0, import_react.useRef)(1);
	const gen = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const save = loadSave();
		setRecord({
			wins: save.arcade.ayoWins,
			games: save.arcade.ayoGames
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!view.over || filed.current === gameRef.current) return;
		filed.current = gameRef.current;
		const save = loadSave();
		save.arcade.ayoGames += 1;
		if (view.winner === "player") save.arcade.ayoWins += 1;
		saveSave(save);
		setRecord({
			wins: save.arcade.ayoWins,
			games: save.arcade.ayoGames
		});
		blip(view.winner === "player" ? 640 : 180, .1);
	}, [view.over, view.winner]);
	const board = preview ?? view.board;
	const legal = view.turn === 0 && !view.over && !busy ? legalMoves(view.board, 0) : [];
	async function animate(base, index, path, token) {
		if (path.length === 0) return;
		const next = base.slice();
		next[index] = 0;
		setPreview(next.slice());
		const step = path.length > 14 ? 40 : 80;
		for (const pit of path) {
			if (gen.current !== token) return;
			next[pit] += 1;
			setHot(pit);
			setPreview(next.slice());
			await wait(step);
		}
	}
	async function onPit(index) {
		if (busyRef.current) return;
		const current = viewRef.current;
		if (current.over || current.turn !== 0) return;
		const played = applyMove(current, index);
		if (played.path.length === 0) return;
		const token = gen.current;
		busyRef.current = true;
		setBusy(true);
		try {
			blip(480, .04);
			await animate(current.board, index, played.path, token);
			if (gen.current !== token) return;
			let latest = played.state;
			viewRef.current = latest;
			setPreview(null);
			setHot(null);
			setView(latest);
			if (!latest.over && latest.turn === 1) {
				await wait(240);
				if (gen.current !== token) return;
				const choice = aiChoose(latest);
				if (choice >= 0) {
					const reply = applyMove(latest, choice);
					await animate(latest.board, choice, reply.path, token);
					if (gen.current !== token) return;
					latest = reply.state;
					viewRef.current = latest;
					setPreview(null);
					setHot(null);
					setView(latest);
				}
			}
		} finally {
			if (gen.current === token) {
				busyRef.current = false;
				setBusy(false);
			}
		}
	}
	function pit(index, mine) {
		const count = board[index] ?? 0;
		const playable = mine && legal.includes(index);
		const className = `flex aspect-square flex-col items-center justify-center rounded-full border-2 text-lg font-bold ${hot === index ? "border-gold bg-gold text-ink" : playable ? "border-green bg-gold-soft text-ink" : "border-line bg-card text-ink"}`;
		if (!mine) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className,
			"aria-label": `Computer pit ${count}`,
			children: count
		}, index);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className,
			disabled: !playable,
			onClick: () => void onPit(index),
			"aria-label": `Your pit, ${count} seeds`,
			children: count
		}, index);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: "Arcade · the seed board",
		title: "Ayo",
		help: "Tap a near pit to sow its seeds one by one to the right, around the board. The pit you started from is skipped if the seeds come all the way around. If the last seed lands on the far row and makes 2 or 3, you capture that pit and any 2s and 3s sitting just behind it. You cannot empty the far row in one capture. If the far row is empty, you must feed it when you can. First to 25 captured seeds wins. If a side cannot move, seeds left on each row go to that row's owner.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Computer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: view.store[1]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							record.wins,
							"/",
							record.games,
							" wins"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["You ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: view.store[0]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-3xl border border-line bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-6 gap-1.5",
					children: [
						6,
						7,
						8,
						9,
						10,
						11
					].map((index) => pit(index, false))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 grid grid-cols-6 gap-1.5",
					children: [
						0,
						1,
						2,
						3,
						4,
						5
					].map((index) => pit(index, true))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "mt-3 min-h-6 text-sm text-muted",
				children: busy && view.turn === 1 ? "Computer is sowing." : view.message
			}),
			view.over ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: view.winner === "player" ? "The board is yours." : view.winner === "draw" ? "Level board." : "Computer keeps the seeds.",
				text: `You ${view.store[0]} · Computer ${view.store[1]}.`
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-4",
				onClick: () => {
					gen.current += 1;
					busyRef.current = false;
					setBusy(false);
					const fresh = initialAyo();
					gameRef.current += 1;
					viewRef.current = fresh;
					setPreview(null);
					setHot(null);
					setView(fresh);
				},
				children: "New board"
			})
		]
	});
}
var GOODS = [
	{
		key: "rice",
		label: "Rice",
		icon: Wheat
	},
	{
		key: "oil",
		label: "Palm oil",
		icon: Droplets
	},
	{
		key: "ankara",
		label: "Ankara",
		icon: Shirt
	},
	{
		key: "suya",
		label: "Suya",
		icon: Flame
	},
	{
		key: "fish",
		label: "Fish",
		icon: Fish
	},
	{
		key: "apple",
		label: "Apple",
		icon: Apple
	},
	{
		key: "eggs",
		label: "Eggs",
		icon: Egg
	},
	{
		key: "carton",
		label: "Carton",
		icon: Package
	}
];
function deal() {
	const cards = GOODS.slice(0, 8).flatMap((good) => [{
		id: `${good.key}-a`,
		...good
	}, {
		id: `${good.key}-b`,
		...good
	}]);
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
	return cards;
}
function MemoryBoard() {
	const [cards, setCards] = (0, import_react.useState)(deal);
	const [up, setUp] = (0, import_react.useState)([]);
	const [matched, setMatched] = (0, import_react.useState)([]);
	const [moves, setMoves] = (0, import_react.useState)(0);
	const [lock, setLock] = (0, import_react.useState)(false);
	const [best, setBest] = (0, import_react.useState)(null);
	const [noted, setNoted] = (0, import_react.useState)(false);
	const hideTimer = (0, import_react.useRef)(null);
	const won = matched.length === 8;
	(0, import_react.useEffect)(() => {
		setBest(loadSave().arcade.memoryBest);
		return () => {
			if (hideTimer.current != null) window.clearTimeout(hideTimer.current);
		};
	}, []);
	function finish(nextMoves) {
		if (noted) return;
		setNoted(true);
		const save = loadSave();
		if (save.arcade.memoryBest == null || nextMoves < save.arcade.memoryBest) {
			save.arcade.memoryBest = nextMoves;
			saveSave(save);
			setBest(nextMoves);
		} else setBest(save.arcade.memoryBest);
		blip(660, .1);
	}
	function flip(id, key) {
		if (lock || won || up.includes(id) || matched.includes(key)) return;
		const next = [...up, id];
		setUp(next);
		blip(500, .03);
		if (next.length < 2) return;
		setMoves((count) => count + 1);
		const [firstId, secondId] = next;
		const first = cards.find((card) => card.id === firstId);
		const second = cards.find((card) => card.id === secondId);
		if (first && second && first.key === second.key) {
			const found = [...matched, first.key];
			setMatched(found);
			setUp([]);
			if (found.length === 8) finish(moves + 1);
			return;
		}
		setLock(true);
		hideTimer.current = window.setTimeout(() => {
			setUp([]);
			setLock(false);
		}, 700);
	}
	function restart() {
		setCards(deal());
		setUp([]);
		setMatched([]);
		setMoves(0);
		setLock(false);
		setNoted(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: "Arcade · the stall",
		title: "Market Memory",
		help: "Flip two goods. If they match, they stay. If they do not, they turn back. The score is how many pairs you tried. Lower is sharper.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Moves ",
					moves,
					best != null ? ` · best ${best}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-4 gap-2",
				children: cards.map((card) => {
					const open = up.includes(card.id) || matched.includes(card.key);
					const Icon = card.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => flip(card.id, card.key),
						className: `flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-1 text-center ${open ? "border-green bg-card text-ink" : "border-green bg-green text-paper"}`,
						"aria-label": open ? card.label : "Hidden good",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-6",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold leading-tight",
							children: card.label
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full border-2 border-gold" })
					}, card.id);
				})
			}),
			won ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: "Stall memorised.",
				text: `${moves} moves${best === moves ? ". New best." : "."}`
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-4",
				onClick: restart,
				children: "New stall"
			})
		]
	});
}
var ANSWERS = [
	"LAGOS",
	"NAIRA",
	"ABUJA",
	"ENUGU",
	"BENIN",
	"GARRI",
	"AKARA",
	"DANFO",
	"OKADA",
	"IKEJA",
	"LEKKI",
	"APAPA",
	"ALABA",
	"WARRI",
	"AKURE",
	"KENTE",
	"HAUSA",
	"BREAD",
	"BEANS",
	"SUGAR",
	"HONEY",
	"MANGO",
	"GUAVA",
	"APPLE",
	"ONION",
	"WATER",
	"LIGHT",
	"METER",
	"TOKEN",
	"UNITS",
	"DISCO",
	"STOCK",
	"SALES",
	"PRICE",
	"QUEUE",
	"MADAM",
	"UNCLE",
	"AUNTY",
	"STAFF",
	"OWNER",
	"GUEST",
	"VISIT",
	"ORDER",
	"NOTES",
	"ALERT",
	"AGENT",
	"UNION",
	"FIRST",
	"WAGES",
	"TRADE",
	"BOOTH",
	"STALL",
	"SHELF",
	"GOODS",
	"WARES",
	"FLYER",
	"PROMO",
	"CLOSE",
	"SHIFT",
	"BREAK",
	"LUNCH",
	"CHIEF",
	"SERVE",
	"GREEN",
	"MOTOR",
	"ROUTE",
	"SALON",
	"BRAID",
	"RELAX",
	"CREAM",
	"BLADE",
	"CHAIR",
	"TABLE",
	"BROOM",
	"FLOOR",
	"PAINT",
	"BRAND",
	"PHONE",
	"TOPUP",
	"RENEW",
	"TAXES",
	"DOZEN",
	"CRATE",
	"KILOS",
	"SCALE",
	"FRESH",
	"STORE",
	"CLOTH",
	"SHIRT",
	"DRESS",
	"COINS",
	"SWEEP",
	"PAYEE",
	"REUSE"
];
var GROUP_PUZZLES = [
	{ groups: [
		{
			tone: "gold",
			label: "Nigerian soups",
			words: [
				"EGUSI",
				"OGBONO",
				"AFANG",
				"BANGA"
			]
		},
		{
			tone: "green",
			label: "Swallows",
			words: [
				"EBA",
				"FUFU",
				"AMALA",
				"TUWO"
			]
		},
		{
			tone: "clay",
			label: "Drinks in the cooler",
			words: [
				"ZOBO",
				"KUNU",
				"MALT",
				"WATER"
			]
		},
		{
			tone: "ink",
			label: "Fried at the stall",
			words: [
				"DODO",
				"AKARA",
				"PUFFPUFF",
				"CHINCHIN"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Lagos rides",
			words: [
				"DANFO",
				"MOLUE",
				"OKADA",
				"KEKE"
			]
		},
		{
			tone: "green",
			label: "Hailed rides",
			words: [
				"UBER",
				"BOLT",
				"TAXI",
				"INDRIVE"
			]
		},
		{
			tone: "clay",
			label: "Go-slow words",
			words: [
				"HOLDUP",
				"TRAFFIC",
				"DIVERSION",
				"LASTMA"
			]
		},
		{
			tone: "ink",
			label: "Busy bus stops",
			words: [
				"OSHODI",
				"OBALENDE",
				"YABA",
				"BERGER"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "When light goes",
			words: [
				"GENERATOR",
				"CANDLE",
				"INVERTER",
				"SOLAR"
			]
		},
		{
			tone: "green",
			label: "Prepaid meter life",
			words: [
				"TOKEN",
				"UNITS",
				"METER",
				"DISCO"
			]
		},
		{
			tone: "clay",
			label: "How customers pay",
			words: [
				"CASH",
				"TRANSFER",
				"POS",
				"USSD"
			]
		},
		{
			tone: "ink",
			label: "What the phone brings",
			words: [
				"ALERT",
				"OTP",
				"AIRTIME",
				"DATA"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Party fabrics",
			words: [
				"ANKARA",
				"ASOOKE",
				"ADIRE",
				"LACE"
			]
		},
		{
			tone: "green",
			label: "What you wear with them",
			words: [
				"GELE",
				"FILA",
				"AGBADA",
				"BABANRIGA"
			]
		},
		{
			tone: "clay",
			label: "Owambe words",
			words: [
				"OWAMBE",
				"ASOEBI",
				"SPRAYING",
				"MC"
			]
		},
		{
			tone: "ink",
			label: "Tailor measurements",
			words: [
				"YARDS",
				"INCHES",
				"NECK",
				"WAIST"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Days the shutter opens",
			words: [
				"MONDAY",
				"TUESDAY",
				"WEDNESDAY",
				"THURSDAY"
			]
		},
		{
			tone: "green",
			label: "Papers you write",
			words: [
				"INVOICE",
				"RECEIPT",
				"QUOTATION",
				"WAYBILL"
			]
		},
		{
			tone: "clay",
			label: "People in the shop",
			words: [
				"OWNER",
				"CASHIER",
				"CUSTOMER",
				"APPRENTICE"
			]
		},
		{
			tone: "ink",
			label: "Before you lock up",
			words: [
				"SWEEP",
				"DISPLAY",
				"RESTOCK",
				"LOCKUP"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Nigerian cities",
			words: [
				"ABUJA",
				"KANO",
				"ENUGU",
				"KADUNA"
			]
		},
		{
			tone: "green",
			label: "Famous markets",
			words: [
				"BALOGUN",
				"ALABA",
				"ARIARIA",
				"KURMI"
			]
		},
		{
			tone: "clay",
			label: "Along the Lekki axis",
			words: [
				"LEKKI",
				"IKOYI",
				"AJAH",
				"EPE"
			]
		},
		{
			tone: "ink",
			label: "Abuja districts",
			words: [
				"WUSE",
				"GARKI",
				"JABI",
				"LUGBE"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Proteins on the fire",
			words: [
				"SUYA",
				"PONMO",
				"SHAKI",
				"CHICKEN"
			]
		},
		{
			tone: "green",
			label: "Tubers",
			words: [
				"YAM",
				"CASSAVA",
				"POTATO",
				"COCOYAM"
			]
		},
		{
			tone: "clay",
			label: "Grains in the sack",
			words: [
				"RICE",
				"MILLET",
				"MAIZE",
				"WHEAT"
			]
		},
		{
			tone: "ink",
			label: "Seasoning",
			words: [
				"MAGGI",
				"KNORR",
				"CURRY",
				"THYME"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Pidgin",
			words: [
				"WAHALA",
				"JAPA",
				"COMOT",
				"GIST"
			]
		},
		{
			tone: "green",
			label: "Yoruba courtesy",
			words: [
				"EKAARO",
				"EKALE",
				"ODABO",
				"ESE"
			]
		},
		{
			tone: "clay",
			label: "Igbo courtesy",
			words: [
				"KEDU",
				"DAALU",
				"NNO",
				"BIKO"
			]
		},
		{
			tone: "ink",
			label: "Hausa courtesy",
			words: [
				"SANNU",
				"NAGODE",
				"BARKA",
				"INAKWANA"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Naija national sides",
			words: [
				"EAGLES",
				"FALCONS",
				"FALCONETS",
				"EAGLETS"
			]
		},
		{
			tone: "green",
			label: "Club sides",
			words: [
				"ENYIMBA",
				"RANGERS",
				"PILLARS",
				"SHOOTING"
			]
		},
		{
			tone: "clay",
			label: "Positions",
			words: [
				"KEEPER",
				"STRIKER",
				"DEFENDER",
				"MIDFIELD"
			]
		},
		{
			tone: "ink",
			label: "Match day",
			words: [
				"WHISTLE",
				"PENALTY",
				"OFFSIDE",
				"CORNER"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Money leaving the shop",
			words: [
				"RENT",
				"DIESEL",
				"SALARY",
				"LEVY"
			]
		},
		{
			tone: "green",
			label: "Money arriving",
			words: [
				"SALES",
				"DEPOSIT",
				"TOPUP",
				"CREDIT"
			]
		},
		{
			tone: "clay",
			label: "Books you keep",
			words: [
				"LEDGER",
				"JOURNAL",
				"MINUTES",
				"REGISTER"
			]
		},
		{
			tone: "ink",
			label: "Parts of a shop day",
			words: [
				"OPENING",
				"RUSH",
				"LULL",
				"CLOSING"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Rooms in the house",
			words: [
				"PARLOUR",
				"KITCHEN",
				"STORE",
				"BALCONY"
			]
		},
		{
			tone: "green",
			label: "What dies first when light goes",
			words: [
				"FREEZER",
				"TELEVISION",
				"FAN",
				"DECODER"
			]
		},
		{
			tone: "clay",
			label: "Things you put on charge",
			words: [
				"PHONE",
				"LAMP",
				"CLIPPER",
				"SPEAKER"
			]
		},
		{
			tone: "ink",
			label: "Who knocks",
			words: [
				"TENANT",
				"LANDLORD",
				"NEIGHBOUR",
				"INLAW"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Stationery",
			words: [
				"PENCIL",
				"ERASER",
				"RULER",
				"SHARPENER"
			]
		},
		{
			tone: "green",
			label: "Provisions",
			words: [
				"MILK",
				"SUGAR",
				"SARDINE",
				"NOODLES"
			]
		},
		{
			tone: "clay",
			label: "School wear",
			words: [
				"UNIFORM",
				"SANDALS",
				"SOCKS",
				"BERET"
			]
		},
		{
			tone: "ink",
			label: "Break-time food",
			words: [
				"BUNS",
				"BISCUIT",
				"SWEET",
				"POPCORN"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "On the barbing chair",
			words: [
				"FADE",
				"SHAVE",
				"BEARD",
				"POWDER"
			]
		},
		{
			tone: "green",
			label: "Hair jobs",
			words: [
				"BRAIDS",
				"WIG",
				"ATTACHMENT",
				"RELAXER"
			]
		},
		{
			tone: "clay",
			label: "Tools on the counter",
			words: [
				"CLIPPER",
				"COMB",
				"SCISSORS",
				"MIRROR"
			]
		},
		{
			tone: "ink",
			label: "How they book you",
			words: [
				"BOOKING",
				"WALKIN",
				"DEPOSIT",
				"RETOUCH"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "Footwear",
			words: [
				"SANDALS",
				"SLIPPERS",
				"HEELS",
				"LOAFERS"
			]
		},
		{
			tone: "green",
			label: "Bags",
			words: [
				"HANDBAG",
				"BACKPACK",
				"CLUTCH",
				"DUFFEL"
			]
		},
		{
			tone: "clay",
			label: "Jewellery",
			words: [
				"EARRINGS",
				"CHAIN",
				"BANGLE",
				"RING"
			]
		},
		{
			tone: "ink",
			label: "On the makeup tray",
			words: [
				"LIPSTICK",
				"CREAM",
				"SPONGE",
				"MASCARA"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "News channels",
			words: [
				"NTA",
				"AIT",
				"CHANNELS",
				"ARISE"
			]
		},
		{
			tone: "green",
			label: "Apps on the phone",
			words: [
				"YOUTUBE",
				"NETFLIX",
				"SHOWMAX",
				"SPOTIFY"
			]
		},
		{
			tone: "clay",
			label: "What you watch or hear",
			words: [
				"MOVIE",
				"SKIT",
				"PODCAST",
				"NEWS"
			]
		},
		{
			tone: "ink",
			label: "On the remote",
			words: [
				"VOLUME",
				"MUTE",
				"REWIND",
				"PAUSE"
			]
		}
	] },
	{ groups: [
		{
			tone: "gold",
			label: "At the party",
			words: [
				"BRIDE",
				"GROOM",
				"USHERS",
				"ALAGA"
			]
		},
		{
			tone: "green",
			label: "People with the sound",
			words: [
				"DJ",
				"HYPEMAN",
				"PLAYLIST",
				"MC"
			]
		},
		{
			tone: "clay",
			label: "Food for guests",
			words: [
				"JOLLOF",
				"FRIEDRICE",
				"SMALLCHOPS",
				"PEPPERSOUP"
			]
		},
		{
			tone: "ink",
			label: "Guests take them home",
			words: [
				"SOUVENIR",
				"CUP",
				"PROGRAM",
				"TOTE"
			]
		}
	] }
];
var SCRAMBLES = [
	{
		answer: "JOLLOF",
		hint: "The rice that can start a friendly argument"
	},
	{
		answer: "DANFO",
		hint: "Yellow bus, loud conductor"
	},
	{
		answer: "ANKARA",
		hint: "Print fabric for an owambe"
	},
	{
		answer: "GENERATOR",
		hint: "Starts singing when the light goes"
	},
	{
		answer: "INVOICE",
		hint: "A polite way to say please pay"
	},
	{
		answer: "CUSTOMER",
		hint: "The person the chair is waiting for"
	},
	{
		answer: "SUYA",
		hint: "Night meat, spice, and paper"
	},
	{
		answer: "OWAMBE",
		hint: "If there is a gele, you are probably here"
	},
	{
		answer: "BALOGUN",
		hint: "Lagos market where fabric goes to walk"
	},
	{
		answer: "OKADA",
		hint: "Two wheels through go-slow"
	},
	{
		answer: "EGUSI",
		hint: "Melon seeds, leaves, and a swallow"
	},
	{
		answer: "PLANTAIN",
		hint: "Ripe and fried, it becomes dodo"
	},
	{
		answer: "TRANSFER",
		hint: "Payment that should bring an alert"
	},
	{
		answer: "INVENTORY",
		hint: "The list that stops 'it has finished'"
	},
	{
		answer: "AGBADA",
		hint: "Flowing outfit with room for a speech"
	},
	{
		answer: "RECEIPT",
		hint: "Proof the money really landed"
	},
	{
		answer: "BOOKING",
		hint: "A customer claiming a time"
	},
	{
		answer: "WHATSAPP",
		hint: "Where half the orders actually start"
	},
	{
		answer: "ASOEBI",
		hint: "Cloth that says you belong to the party"
	},
	{
		answer: "MOLUE",
		hint: "The big old Lagos bus"
	},
	{
		answer: "GARRI",
		hint: "Soak it, or turn it into eba"
	},
	{
		answer: "CALABAR",
		hint: "A city people trust with a kitchen"
	},
	{
		answer: "PALMWINE",
		hint: "Tapped, sweet, and best the same day"
	},
	{
		answer: "DIESEL",
		hint: "What the generator drinks"
	},
	{
		answer: "BARBING",
		hint: "Fade, shave, powder, next"
	},
	{
		answer: "DEPOSIT",
		hint: "Money that holds the goods"
	},
	{
		answer: "AGEGE",
		hint: "The bread with a soft reputation"
	},
	{
		answer: "WAHALA",
		hint: "Trouble, but make it pidgin"
	}
];
var RIDDLES = [
	{
		prompt: "I arrive on a phone, I am not a call, and the shop gets loud when I land. What am I?",
		answers: [
			"bank alert",
			"alert",
			"credit alert",
			"transfer alert"
		],
		hint: "It usually follows a transfer."
	},
	{
		prompt: "NEPA brings me, the generator rests when I come, and the freezer prays for me. What am I?",
		answers: [
			"light",
			"electricity",
			"power",
			"nepa",
			"up nepa"
		],
		hint: "People shout when I return."
	},
	{
		prompt: "I am yellow, loud, and full of strangers going the same way. Miss me and you may trek. What am I?",
		answers: [
			"danfo",
			"bus",
			"molue"
		],
		hint: "A conductor is shouting my route."
	},
	{
		prompt: "You buy me in yards, you wear me on owambe day, and my pattern tells a story. What am I?",
		answers: [
			"ankara",
			"lace",
			"aso oke",
			"asooke",
			"fabric",
			"cloth"
		],
		hint: "The tailor is already asking for your measurements."
	},
	{
		prompt: "I have a neck but no head, and I usually wear a cap. Shops sell me cold. What am I?",
		answers: ["bottle", "a bottle"],
		hint: "Malt, coke, or water can live in me."
	},
	{
		prompt: "Peel my outside, cook my inside, eat my outside, throw my inside away. What am I?",
		answers: [
			"corn",
			"maize",
			"corn on the cob"
		],
		hint: "Roasted or boiled, the cob stays."
	},
	{
		prompt: "I have cities with no houses, forests with no trees, and water with no fish. What am I?",
		answers: ["map", "a map"],
		hint: "You can fold me."
	},
	{
		prompt: "The more you take from me, the bigger I get. What am I?",
		answers: [
			"hole",
			"a hole",
			"pit"
		],
		hint: "A well starts as me."
	},
	{
		prompt: "What belongs to you, but other people use it more than you do?",
		answers: [
			"your name",
			"name",
			"my name"
		],
		hint: "Customers say it when they greet you."
	},
	{
		prompt: "I have a thumb and four fingers but I am not alive. What am I?",
		answers: ["glove", "a glove"],
		hint: "A tailor or a cook may wear me."
	},
	{
		prompt: "What has words but never speaks?",
		answers: ["book", "a book"],
		hint: "It can be a ledger too."
	},
	{
		prompt: "I am full of keys but I cannot open your shop door. What am I?",
		answers: [
			"keyboard",
			"piano",
			"a keyboard",
			"a piano"
		],
		hint: "One answer sits on a laptop. The other sits in church."
	},
	{
		prompt: "What runs around the compound but never moves?",
		answers: [
			"fence",
			"a fence",
			"wall",
			"a wall"
		],
		hint: "The gate is cut into me."
	},
	{
		prompt: "Two fathers and two sons go to the market and buy three agbadas, one each. How many people went?",
		answers: [
			"3",
			"three",
			"three people"
		],
		hint: "A grandfather, a father, and a son."
	},
	{
		prompt: "I sit in the shop all month and only speak when something is running low. What am I?",
		answers: [
			"inventory",
			"stock",
			"stock list",
			"inventory list"
		],
		hint: "JKTL keeps me so you do not guess."
	},
	{
		prompt: "What is always in front of you at the shop, but you can never see it?",
		answers: [
			"the future",
			"future",
			"tomorrow"
		],
		hint: "Tomorrow's customers live here."
	},
	{
		prompt: "I fly without wings. I cry without eyes. When I visit, light often leaves. What am I?",
		answers: [
			"rain",
			"cloud",
			"a cloud",
			"the rain"
		],
		hint: "The compound smells like earth after me."
	},
	{
		prompt: "What gets wetter the more it dries?",
		answers: ["towel", "a towel"],
		hint: "It hangs behind the salon chair."
	},
	{
		prompt: "I have an eye but I cannot see. A tailor cannot finish without me. What am I?",
		answers: ["needle", "a needle"],
		hint: "Thread knows me well."
	},
	{
		prompt: "You can pay me, fold me, and still lose me in a receipt book. Customers argue if I do not match. What am I?",
		answers: [
			"change",
			"balance",
			"the change"
		],
		hint: "The till game is named after me."
	}
];
function pick(date, salt, length) {
	return dateSeed(`${date}:${salt}`) % length;
}
function dailyAnswer(date = lagosDate()) {
	return ANSWERS[pick(date, "guess", ANSWERS.length)];
}
function dailyGroups(date = lagosDate()) {
	const puzzle = GROUP_PUZZLES[pick(date, "groups", GROUP_PUZZLES.length)];
	return {
		puzzle,
		words: seededShuffle(puzzle.groups.flatMap((group) => group.words), dateSeed(`${date}:group-order`))
	};
}
function matchGroup(puzzle, words) {
	const key = words.map((word) => word.toUpperCase()).sort().join("|");
	return puzzle.groups.find((group) => group.words.slice().sort().join("|") === key) ?? null;
}
function oneAway(puzzle, words) {
	return puzzle.groups.some((group) => {
		const set = new Set(group.words);
		return words.filter((word) => set.has(word)).length === 3;
	});
}
function dailyScramble(date = lagosDate()) {
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
	if (letters === puzzle.answer && letters.length > 1) letters = letters.slice(1) + letters[0];
	return {
		puzzle,
		letters
	};
}
function dailyRiddle(date = lagosDate()) {
	return RIDDLES[pick(date, "riddle", RIDDLES.length)];
}
function scoreGuess(guess, answer) {
	const g = guess.toUpperCase();
	const a = answer.toUpperCase();
	const marks = Array(g.length).fill("absent");
	const left = [];
	const counts = /* @__PURE__ */ new Map();
	for (let i = 0; i < a.length; i++) if (g[i] === a[i]) marks[i] = "correct";
	else left.push(i);
	for (let i = 0; i < a.length; i++) if (marks[i] !== "correct") counts.set(a[i], (counts.get(a[i]) ?? 0) + 1);
	for (const i of left) {
		const n = counts.get(g[i]) ?? 0;
		if (n > 0) {
			marks[i] = "present";
			counts.set(g[i], n - 1);
		}
	}
	return marks;
}
function loose(value) {
	return value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().replace(/^(a|an|the|some|my) /, "");
}
function Riddle() {
	const date = (0, import_react.useMemo)(() => lagosDate(), []);
	const riddle = (0, import_react.useMemo)(() => dailyRiddle(date), [date]);
	const key = `riddle:${date}`;
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [tries, setTries] = (0, import_react.useState)(0);
	const [won, setWon] = (0, import_react.useState)(false);
	const [showHint, setShowHint] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("Read it twice. The simple answer is usually right.");
	const [ready, setReady] = (0, import_react.useState)(false);
	const filed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadProgress(key);
		if (saved) {
			setTries(saved.tries ?? 0);
			setWon(saved.won ?? false);
			setShowHint(saved.showHint ?? false);
			if (saved.won) setMessage("You already solved today's riddle.");
		}
		setReady(true);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveProgress(key, {
			tries,
			won,
			showHint
		});
	}, [
		ready,
		key,
		tries,
		won,
		showHint
	]);
	(0, import_react.useEffect)(() => {
		if (!ready || !won || filed.current) return;
		filed.current = true;
		saveSave(markDaily(loadSave(), "riddle", date, true));
	}, [
		ready,
		won,
		date
	]);
	function submit(event) {
		event.preventDefault();
		if (won || !answer.trim()) return;
		const nextTries = tries + 1;
		setTries(nextTries);
		const got = loose(answer);
		if (riddle.answers.some((item) => loose(item) === got)) {
			setWon(true);
			setMessage("That is it.");
			blip(680, .1);
			return;
		}
		setMessage(nextTries >= 3 ? "Still off. The hint is there if you want it." : "Not quite. Try a plainer answer.");
		blip(170, .07, "square");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: `Daily · ${lagosLabel(date)}`,
		title: "Riddle",
		help: "Type the answer in your own words. Small words like 'a' and 'the' do not matter. The hint does not spoil the streak.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-line bg-card px-5 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Today's clue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl leading-snug text-ink",
						children: riddle.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": "Riddle answer",
							value: answer,
							disabled: won,
							onChange: (event) => setAnswer(event.target.value.slice(0, 80)),
							className: "min-h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-base text-ink outline-none",
							placeholder: "Your answer",
							autoComplete: "off"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							disabled: won || !answer.trim(),
							children: "Answer"
						})]
					}),
					showHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: ["Hint: ", riddle.hint]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "mt-4 min-h-6 text-sm text-muted",
				children: [
					message,
					" ",
					tries > 0 ? `Tries: ${tries}.` : ""
				]
			}),
			!won ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-2",
				onClick: () => setShowHint(true),
				children: "Show hint"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: "Solved.",
				text: "A new clue lands after midnight in Lagos."
			})
		]
	});
}
function Scramble() {
	const date = (0, import_react.useMemo)(() => lagosDate(), []);
	const { puzzle, letters } = (0, import_react.useMemo)(() => dailyScramble(date), [date]);
	const pool = (0, import_react.useMemo)(() => letters.split("").map((letter, index) => ({
		letter,
		index
	})), [letters]);
	const key = `scramble:${date}`;
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [message, setMessage] = (0, import_react.useState)(puzzle.hint);
	const [won, setWon] = (0, import_react.useState)(false);
	const [tries, setTries] = (0, import_react.useState)(0);
	const [hint, setHint] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	const filed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadProgress(key);
		if (saved) {
			setPicked(saved.picked ?? []);
			setWon(saved.won ?? false);
			setTries(saved.tries ?? 0);
			setHint(saved.hint ?? false);
			if (saved.won) setMessage("Already solved today.");
		}
		setReady(true);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveProgress(key, {
			picked,
			won,
			tries,
			hint
		});
	}, [
		ready,
		key,
		picked,
		won,
		tries,
		hint
	]);
	(0, import_react.useEffect)(() => {
		if (!ready || !won || filed.current) return;
		filed.current = true;
		saveSave(markDaily(loadSave(), "scramble", date, true));
	}, [
		ready,
		won,
		date
	]);
	const built = picked.map((index) => pool[index]?.letter ?? "").join("");
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (won) return;
			const onButton = event.target instanceof HTMLElement && Boolean(event.target.closest("button"));
			if ((event.key === "Enter" || event.key === "Backspace") && onButton) return;
			if (event.key === "Backspace") setPicked((current) => current.slice(0, -1));
			else if (event.key === "Enter") check();
			else if (/^[a-z]$/i.test(event.key)) {
				const letter = event.key.toUpperCase();
				setPicked((current) => {
					const tile = pool.find((item) => item.letter === letter && !current.includes(item.index));
					return tile ? [...current, tile.index] : current;
				});
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	function check() {
		if (won || built.length !== puzzle.answer.length) {
			setMessage("Use every letter.");
			return;
		}
		setTries((count) => count + 1);
		if (built === puzzle.answer) {
			setWon(true);
			setMessage("That is the word.");
			blip(680, .1);
			return;
		}
		setShake(true);
		window.setTimeout(() => setShake(false), 280);
		setMessage("Not that order. Try again.");
		blip(170, .08, "square");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: `Daily · ${lagosLabel(date)}`,
		title: "Scramble",
		help: "Tap the letters into the right order, or type on your keyboard. The hint under the tiles is a nudge, not the answer. Everyone gets the same word today.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: puzzle.hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-5 flex min-h-16 flex-wrap justify-center gap-2 ${shake ? "animate-shake" : ""}`,
				children: Array.from({ length: puzzle.answer.length }, (_, slot) => {
					const index = picked[slot];
					const letter = index == null ? "" : pool[index].letter;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-12 items-center justify-center rounded-xl border-2 border-ink bg-card text-xl font-bold",
						onClick: () => setPicked((current) => current.filter((item) => item !== index)),
						disabled: !letter || won,
						children: letter
					}, slot);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap justify-center gap-2",
				children: pool.map((tile) => {
					const used = picked.includes(tile.index);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: used || won,
						onClick: () => setPicked((current) => [...current, tile.index]),
						className: "flex size-12 items-center justify-center rounded-xl border border-line bg-gold-soft text-xl font-bold text-ink disabled:opacity-30",
						children: tile.letter
					}, tile.index);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "mt-4 min-h-6 text-center text-sm text-muted",
				children: [message, hint && !won ? ` Starts with ${puzzle.answer[0]}.` : ""]
			}),
			!won ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: check,
						disabled: built.length !== puzzle.answer.length,
						children: "Check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						onClick: () => setPicked([]),
						children: "Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => setHint(true),
						children: "First letter"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: "Unscrambled.",
				text: `${puzzle.answer} · ${tries} ${tries === 1 ? "try" : "tries"}.`
			})
		]
	});
}
var DENOMS = [
	1e3,
	500,
	200,
	100,
	50,
	20,
	10,
	5
];
var NAMES = [
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
	"Ejiro"
];
var ITEMS = [
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
	"jollof and zobo"
];
function naira(value) {
	return `₦${value.toLocaleString("en-NG")}`;
}
function makeSale(rnd = Math.random) {
	const notes = [
		500,
		1e3,
		2e3,
		5e3,
		1e4
	];
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
		paid
	};
}
function sumDenoms(denoms) {
	return denoms.reduce((sum, value) => sum + value, 0);
}
var ROUND = 60;
function TillBoard() {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [sale, setSale] = (0, import_react.useState)(() => makeSale());
	const [given, setGiven] = (0, import_react.useState)([]);
	const [left, setLeft] = (0, import_react.useState)(ROUND);
	const [score, setScore] = (0, import_react.useState)(0);
	const [best, setBest] = (0, import_react.useState)(0);
	const [shake, setShake] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("Count it out, then hand it over.");
	const scoreRef = (0, import_react.useRef)(0);
	const filed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setBest(loadSave().arcade.tillBest);
	}, []);
	(0, import_react.useEffect)(() => {
		if (phase !== "play") return;
		const started = performance.now();
		let frame = 0;
		let lastShown = ROUND;
		const loop = (now) => {
			const remain = Math.max(0, ROUND - (now - started) / 1e3);
			const shown = Math.ceil(remain);
			if (shown !== lastShown) {
				lastShown = shown;
				setLeft(shown);
			}
			if (remain <= 0) {
				setPhase("done");
				return;
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (phase !== "done" || filed.current) return;
		filed.current = true;
		const save = loadSave();
		if (scoreRef.current > save.arcade.tillBest) save.arcade.tillBest = scoreRef.current;
		saveSave(save);
		setBest(save.arcade.tillBest);
		blip(scoreRef.current > 0 ? 640 : 180, .1);
	}, [phase]);
	const due = sale.paid - sale.total;
	const handed = sumDenoms(given);
	const width = Math.max(0, Math.min(100, left / ROUND * 100));
	function give() {
		if (handed !== due) {
			setShake(true);
			window.setTimeout(() => setShake(false), 280);
			setNote(handed > due ? "That is too much." : "Still short.");
			blip(160, .07, "square");
			return;
		}
		const next = scoreRef.current + 1;
		scoreRef.current = next;
		setScore(next);
		setSale(makeSale());
		setGiven([]);
		setNote("Correct. Next customer.");
		blip(620, .05);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: "Arcade · one minute",
		title: "Till Rush",
		help: "The receipt shows the total and what the customer handed you. Tap notes and coins until the change is exact, then give it. A wrong handful stays on the counter so you can fix it. Serve as many people as you can before the minute ends.",
		children: [
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-line bg-card px-5 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-tight text-ink",
						children: "The till is closed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: ["You have 60 seconds. Exact change only. ", best > 0 ? `Your best is ${best} customers.` : "No best yet."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-5",
						onClick: () => {
							scoreRef.current = 0;
							filed.current = false;
							setScore(0);
							setGiven([]);
							setSale(makeSale());
							setLeft(ROUND);
							setNote("Count it out, then hand it over.");
							setPhase("play");
						},
						children: "Open the till"
					})
				]
			}) : null,
			phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-green",
						style: { width: `${width}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						left,
						"s left · served ",
						score
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `mt-3 rounded-3xl border border-line bg-card px-5 py-5 ${shake ? "animate-shake" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-muted",
							children: sale.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl leading-tight text-ink",
							children: sale.item
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold",
										children: naira(sale.total)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-semibold",
										children: naira(sale.paid)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-line pt-2 text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Change" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-bold",
										children: naira(due)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "In your hand"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: handed === due ? "font-bold text-green" : handed > due ? "font-bold text-clay" : "font-semibold",
										children: naira(handed)
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-4 gap-2",
					children: DENOMS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-14 rounded-2xl border border-line bg-gold-soft text-sm font-bold text-ink",
						onClick: () => setGiven((current) => [...current, value]),
						children: naira(value)
					}, value))
				}),
				given.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: given.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-h-11 rounded-full border border-line bg-card px-3 text-sm font-semibold",
						onClick: () => setGiven((current) => current.filter((_, item) => item !== index)),
						children: [naira(value), " ×"]
					}, `${value}-${index}`))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"aria-live": "polite",
					className: "mt-3 min-h-6 text-sm text-muted",
					children: note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: give,
						children: "Give change"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						onClick: () => setGiven([]),
						children: "Clear hand"
					})]
				})
			] }) : null,
			phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: score === 0 ? "The minute went." : `${score} served.`,
				text: score >= best && score > 0 ? "That is the best this phone has seen." : `Best on this phone: ${best}.`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-4",
				onClick: () => setPhase("ready"),
				children: "Count again"
			})] }) : null
		]
	});
}
var SHAPES = [
	"circle",
	"triangle",
	"cross",
	"square",
	"star"
];
var SPEC = [
	["circle", [
		1,
		2,
		3,
		4,
		5,
		7,
		8,
		10,
		11,
		12,
		13,
		14
	]],
	["triangle", [
		1,
		2,
		3,
		4,
		5,
		7,
		8,
		10,
		11,
		12,
		13,
		14
	]],
	["cross", [
		1,
		2,
		3,
		5,
		7,
		10,
		11,
		13,
		14
	]],
	["square", [
		1,
		2,
		3,
		5,
		7,
		10,
		11,
		13,
		14
	]],
	["star", [
		1,
		2,
		3,
		4,
		5,
		7,
		8
	]]
];
function shapeLabel(shape) {
	if (shape === "whot") return "Whot";
	return shape.charAt(0).toUpperCase() + shape.slice(1);
}
function buildDeck() {
	const cards = [];
	for (const [shape, ranks] of SPEC) for (const rank of ranks) cards.push({
		id: `${shape}-${rank}`,
		shape,
		rank
	});
	for (let i = 0; i < 5; i++) cards.push({
		id: `whot-20-${i}`,
		shape: "whot",
		rank: 20
	});
	return cards;
}
function shuffle(items, rnd = Math.random) {
	const arr = items.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rnd() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function topOf(state) {
	return state.discard[state.discard.length - 1];
}
function canPlay(card, state) {
	if (state.pending > 0) return card.rank === 2;
	const top = topOf(state);
	if (!top) return true;
	if (card.shape === "whot") return true;
	if (top.shape === "whot") return state.called ? card.shape === state.called : true;
	return card.shape === top.shape || card.rank === top.rank;
}
function legalCards(state, who) {
	return state[who].filter((card) => canPlay(card, state));
}
function drawN(state, count) {
	const market = state.market.slice();
	const discard = state.discard.slice();
	const cards = [];
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
	return {
		market,
		discard,
		cards
	};
}
function opponent(who) {
	return who === "player" ? "ai" : "player";
}
function passTo(state, who, message) {
	return {
		...state,
		phase: who === "ai" ? "ai" : "player",
		message: message || state.message,
		turn: state.turn + 1
	};
}
function bestShape(hand) {
	const counts = new Map(SHAPES.map((shape) => [shape, 0]));
	for (const card of hand) if (card.shape !== "whot") counts.set(card.shape, (counts.get(card.shape) ?? 0) + 1);
	return SHAPES.slice().sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0))[0];
}
function finishByCount(state) {
	const player = state.player.length;
	const ai = state.ai.length;
	const winner = player === ai ? "draw" : player < ai ? "player" : "ai";
	const message = winner === "draw" ? "Market locked. It is a draw." : winner === "player" ? "Market locked. You had fewer cards." : "Market locked. Computer had fewer cards.";
	return {
		...state,
		phase: "over",
		winner,
		message,
		turn: state.turn + 1
	};
}
function afterPlay(state, card, who) {
	if (state[who].length === 0) return {
		...state,
		phase: "over",
		winner: who,
		message: who === "player" ? "You cleared your hand." : "Computer cleared its hand.",
		turn: state.turn + 1
	};
	const other = opponent(who);
	if (card.rank === 2) return passTo({
		...state,
		pending: state.pending + 2,
		called: null
	}, other, "Pick two.");
	if (card.rank === 1) return passTo({
		...state,
		called: null
	}, who, "Hold on. Play again.");
	if (card.rank === 8) return passTo({
		...state,
		called: null
	}, who, "Suspension. Play again.");
	if (card.rank === 14) {
		const drawn = drawN(state, 1);
		return passTo({
			...state,
			market: drawn.market,
			discard: drawn.discard,
			called: null,
			player: who === "ai" ? [...state.player, ...drawn.cards] : state.player,
			ai: who === "player" ? [...state.ai, ...drawn.cards] : state.ai
		}, other, "General market. One card, then play.");
	}
	if (card.shape === "whot") {
		if (who === "ai") {
			const shape = bestShape(state.ai);
			return passTo({
				...state,
				called: shape
			}, "player", `Computer called ${shapeLabel(shape)}.`);
		}
		return {
			...state,
			phase: "declare",
			called: null,
			message: "Call the next shape.",
			turn: state.turn + 1
		};
	}
	return passTo({
		...state,
		called: null
	}, other, who === "player" ? "Computer's turn." : "Your turn.");
}
function playCard(state, id, who) {
	if (state.phase === "over" || state.phase === "declare") return state;
	if (who === "player" && state.phase !== "player") return state;
	if (who === "ai" && state.phase !== "ai") return state;
	const hand = state[who];
	const card = hand.find((item) => item.id === id);
	if (!card || !canPlay(card, state)) return state;
	const nextHand = hand.filter((item) => item.id !== id);
	const message = nextHand.length === 1 ? who === "player" ? "Last card!" : "Computer says last card." : "";
	return afterPlay({
		...state,
		player: who === "player" ? nextHand : state.player,
		ai: who === "ai" ? nextHand : state.ai,
		discard: [...state.discard, card],
		passes: 0,
		message
	}, card, who);
}
function declareShape(state, shape) {
	if (state.phase !== "declare") return state;
	return passTo({
		...state,
		called: shape
	}, "ai", `You called ${shapeLabel(shape)}.`);
}
function takeMarket(state, who) {
	if (state.phase === "over" || state.phase === "declare") return state;
	if (who === "player" && state.phase !== "player") return state;
	if (who === "ai" && state.phase !== "ai") return state;
	const other = opponent(who);
	if (state.pending > 0) {
		const drawn = drawN(state, state.pending);
		return passTo({
			...state,
			market: drawn.market,
			discard: drawn.discard,
			pending: 0,
			passes: 0,
			player: who === "player" ? [...state.player, ...drawn.cards] : state.player,
			ai: who === "ai" ? [...state.ai, ...drawn.cards] : state.ai
		}, other, `Picked ${drawn.cards.length}.`);
	}
	const drawn = drawN(state, 1);
	if (drawn.cards.length === 0) {
		const passes = state.passes + 1;
		if (passes >= 2) return finishByCount({
			...state,
			passes
		});
		return passTo({
			...state,
			passes
		}, other, "Market is dry.");
	}
	const card = drawn.cards[0];
	const holding = {
		...state,
		market: drawn.market,
		discard: drawn.discard,
		passes: 0,
		player: who === "player" ? [...state.player, card] : state.player,
		ai: who === "ai" ? [...state.ai, card] : state.ai,
		message: who === "player" ? "You went to market." : "Computer went to market."
	};
	if (canPlay(card, holding)) return playCard(holding, card.id, who);
	return passTo(holding, other, holding.message);
}
function aiScore(state, card) {
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
function aiAct(state) {
	if (state.phase !== "ai") return state;
	const legal = legalCards(state, "ai");
	if (legal.length === 0) return takeMarket(state, "ai");
	const card = legal.slice().sort((a, b) => aiScore(state, b) - aiScore(state, a))[0];
	return playCard(state, card.id, "ai");
}
function createWhot(rnd = Math.random) {
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
		turn: 1
	};
}
var INK = {
	circle: "text-clay",
	triangle: "text-green",
	cross: "text-ink",
	square: "text-star",
	star: "text-gold",
	whot: "text-ink"
};
function Suit({ shape }) {
	if (shape === "whot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-display text-3xl leading-none text-ink",
		children: "W"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: `h-8 w-8 ${INK[shape]}`,
		"aria-hidden": true,
		children: [
			shape === "circle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "7",
				fill: "currentColor"
			}) : null,
			shape === "triangle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "12,3.5 21,20 3,20",
				fill: "currentColor"
			}) : null,
			shape === "cross" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z"
			}) : null,
			shape === "square" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "5",
				width: "14",
				height: "14",
				rx: "1.5",
				fill: "currentColor"
			}) : null,
			shape === "star" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M12 2.2 14.8 8.4 21.5 9.1 16.6 13.7 18 20.5 12 17.1 6 20.5 7.4 13.7 2.5 9.1 9.2 8.4Z"
			}) : null
		]
	});
}
function Face({ card, playable, onPlay }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute left-1.5 top-1 text-xs font-bold",
			children: card.shape === "whot" ? "W" : card.rank
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute bottom-1 right-1.5 rotate-180 text-xs font-bold",
			children: card.shape === "whot" ? "W" : card.rank
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Suit, { shape: card.shape })
	] });
	const className = `relative flex h-28 w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 bg-card ${playable ? "border-gold" : "border-line"}`;
	if (!onPlay) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `${className} ${playable ? "-translate-y-1" : "opacity-45"}`,
		disabled: !playable,
		"aria-label": `${shapeLabel(card.shape)} ${card.shape === "whot" ? "" : card.rank}`.trim(),
		onClick: onPlay,
		children: body
	});
}
function WhotBoard() {
	const [state, setState] = (0, import_react.useState)(() => createWhot());
	const [record, setRecord] = (0, import_react.useState)({
		wins: 0,
		games: 0
	});
	const [gameId, setGameId] = (0, import_react.useState)(0);
	const filed = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const save = loadSave();
		setRecord({
			wins: save.arcade.whotWins,
			games: save.arcade.whotGames
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (state.phase !== "ai") return;
		const timer = window.setTimeout(() => {
			setState((current) => current.phase === "ai" ? aiAct(current) : current);
		}, 650);
		return () => window.clearTimeout(timer);
	}, [state.phase, state.turn]);
	(0, import_react.useEffect)(() => {
		if (state.phase !== "over" || filed.current === gameId) return;
		filed.current = gameId;
		const save = loadSave();
		save.arcade.whotGames += 1;
		if (state.winner === "player") save.arcade.whotWins += 1;
		saveSave(save);
		setRecord({
			wins: save.arcade.whotWins,
			games: save.arcade.whotGames
		});
		blip(state.winner === "player" ? 680 : 160, .1, state.winner === "player" ? "sine" : "triangle");
	}, [
		state.phase,
		state.winner,
		gameId
	]);
	const top = state.discard[state.discard.length - 1];
	const yourTurn = state.phase === "player";
	function play(id) {
		if (!yourTurn) return;
		const card = state.player.find((item) => item.id === id);
		if (!card || !canPlay(card, state)) return;
		blip(520, .04);
		setState(playCard(state, id, "player"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: "Arcade · two players",
		title: "Whot",
		help: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Match the shape or the number. Whot is wild: play it and call the next shape. 1 is hold on and 8 is suspension, so in this two-player game you play again. 2 is pick two, and another 2 can stack on it. 14 is general market: the other side draws one, then plays. If you cannot play, go to market. A normal draw is played immediately when it fits. First empty hand wins." }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Your record ",
					record.wins,
					"/",
					record.games || 0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-3xl bg-green px-3 py-4 text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex",
							"aria-hidden": true,
							children: Array.from({ length: Math.min(state.ai.length, 6) }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-11 place-items-center rounded-lg border border-paper/30 bg-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 rounded-full border-2 border-gold" })
							}, index))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold",
							children: [state.ai.length, " cards"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "grid h-28 w-20 place-items-center rounded-xl bg-ink text-center text-xs font-semibold text-paper",
							onClick: () => yourTurn && setState(takeMarket(state, "player")),
							disabled: !yourTurn,
							children: ["Market", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-lg",
								children: state.market.length
							})]
						}), top ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
							card: top,
							playable: false
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-sm",
						children: [
							top?.shape === "whot" && state.called ? `Called ${shapeLabel(state.called)}. ` : "",
							state.pending > 0 ? `Pick ${state.pending} waiting. ` : "",
							state.phase === "ai" ? "Computer is playing." : state.message
						]
					})
				]
			}),
			state.phase === "declare" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border border-line bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-ink",
					children: "Call a shape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-5 gap-2",
					children: SHAPES.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-line bg-paper text-xs font-semibold",
						onClick: () => {
							blip(600, .05);
							setState(declareShape(state, shape));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Suit, { shape }), shapeLabel(shape)]
					}, shape))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-2 overflow-x-auto pb-2",
				"aria-label": "Your hand",
				children: state.player.map((card) => {
					const allowed = yourTurn && canPlay(card, state);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						card,
						playable: allowed,
						onPlay: () => play(card.id)
					}, card.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "min-h-6 text-sm text-muted",
				children: yourTurn ? "Gold edges can be played." : state.phase === "over" ? state.message : "Wait for the computer."
			}),
			state.phase === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: state.winner === "player" ? "Hand clear." : state.winner === "draw" ? "Draw." : "Computer finished first.",
				text: state.winner === "player" ? "Deal again if the shop is still quiet." : "One more hand?"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-4",
				onClick: () => {
					setGameId((id) => id + 1);
					setState(createWhot());
				},
				children: "New hand"
			})
		]
	});
}
var TONE = {
	gold: "bg-gold-soft text-ink",
	green: "bg-green-soft text-ink",
	clay: "bg-clay-soft text-ink",
	ink: "bg-ink text-paper"
};
function WordGroups() {
	const date = (0, import_react.useMemo)(() => lagosDate(), []);
	const { puzzle, words } = (0, import_react.useMemo)(() => dailyGroups(date), [date]);
	const key = `word-groups:${date}`;
	const [solved, setSolved] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [mistakes, setMistakes] = (0, import_react.useState)(0);
	const [lost, setLost] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("Tap four words that belong together.");
	const [shake, setShake] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const filed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadProgress(key);
		if (saved) {
			setSolved(saved.solved ?? []);
			setSelected(saved.selected ?? []);
			setMistakes(saved.mistakes ?? 0);
			setLost(saved.lost ?? false);
		}
		setReady(true);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveProgress(key, {
			solved,
			mistakes,
			selected,
			lost
		});
	}, [
		ready,
		key,
		solved,
		mistakes,
		selected,
		lost
	]);
	const won = solved.length === 4;
	const done = won || lost;
	(0, import_react.useEffect)(() => {
		if (!ready || filed.current || !done) return;
		filed.current = true;
		saveSave(markDaily(loadSave(), "word-groups", date, won));
		if (lost) setMessage("Four misses. Here is how they grouped.");
		if (won) setMessage("All four. Clean board.");
	}, [
		ready,
		done,
		won,
		lost,
		date
	]);
	const remaining = words.filter((word) => !solved.some((group) => group.words.includes(word)));
	function toggle(word) {
		if (done || solved.some((group) => group.words.includes(word))) return;
		setSelected((current) => {
			if (current.includes(word)) return current.filter((item) => item !== word);
			if (current.length >= 4) return current;
			return [...current, word];
		});
	}
	function submit() {
		if (selected.length !== 4 || done) return;
		const group = matchGroup(puzzle, selected);
		if (group) {
			setSolved((current) => [...current, group]);
			setSelected([]);
			setMessage(group.label);
			blip(620, .08);
			return;
		}
		const nextMistakes = mistakes + 1;
		setMistakes(nextMistakes);
		setShake(true);
		window.setTimeout(() => setShake(false), 280);
		blip(160, .08, "square");
		if (oneAway(puzzle, selected)) setMessage("One away.");
		else setMessage("Those four do not share a group.");
		if (nextMistakes >= 4) {
			setLost(true);
			setSolved(puzzle.groups);
			setSelected([]);
		}
	}
	async function share() {
		const text = `JKTL Word Groups · ${lagosLabel(date)}\n${won ? `Solved · ${mistakes} miss${mistakes === 1 ? "" : "es"}` : "Not today"}`;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			setMessage("Could not copy.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: `Daily · ${lagosLabel(date)}`,
		title: "Word Groups",
		help: "Find four groups of four. You have four mistakes. If three of your words belong together, the game will say you are one away. Today's groups are the same for every shop.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				"aria-label": "Mistakes left",
				children: [Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-3 rounded-full ${index < mistakes ? "bg-clay" : "bg-line"}` }, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted",
					children: [4 - Math.min(mistakes, 4), " mistakes left"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: solved.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl px-3 py-3 text-center ${TONE[group.tone]}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: group.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: group.words.join(" · ")
					})]
				}, group.label))
			}),
			!done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 ${shake ? "animate-shake" : ""}`,
				children: remaining.map((word) => {
					const on = selected.includes(word);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => toggle(word),
						className: `min-h-16 rounded-xl border px-2 text-center text-sm font-bold leading-tight ${on ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink"}`,
						children: word
					}, word);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: submit,
					disabled: selected.length !== 4,
					children: "Submit four"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "line",
					onClick: () => setSelected([]),
					children: "Clear"
				})]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "mt-4 min-h-6 text-sm text-muted",
				children: message
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: won ? "Grouped." : "The board is open.",
				text: won ? "Come back after midnight Lagos time for a new set." : "The colours are the groups you were hunting.",
				onShare: () => void share(),
				copied
			}) : null
		]
	});
}
var GUESSES = /* @__PURE__ */ new Set([...`AARON
ABOUT
ABOVE
ABUJA
ABUSE
ACIDS
ACRES
ACTOR
ACUTE
ADAMS
ADDED
ADMIN
ADMIT
ADOBE
ADOPT
ADULT
AFANG
AFTER
AGAIN
AGEGE
AGENT
AGING
AGREE
AHEAD
AIMED
AKARA
AKURE
ALABA
ALARM
ALBUM
ALERT
ALIAS
ALICE
ALIEN
ALIGN
ALIKE
ALIVE
ALLAH
ALLAN
ALLEN
ALLOW
ALLOY
ALONE
ALONG
ALPHA
ALTER
AMBER
AMEND
AMINO
AMONG
ANGEL
ANGER
ANGLE
ANGRY
ANIME
ANNEX
ANNIE
APAPA
APART
APNIC
APPLE
APPLY
APRIL
ARBOR
AREAS
ARENA
ARGUE
ARISE
ARMED
ARMOR
ARRAY
ARROW
ARUBA
ASABA
ASCII
ASIAN
ASIDE
ASKED
ASSET
ATLAS
AUCHI
AUDIO
AUDIT
AUNTY
AUTOS
AVOID
AWARD
AWARE
AWFUL
BABES
BACON
BADGE
BADLY
BAKER
BANDS
BANKS
BARRY
BASED
BASES
BASIC
BASIN
BASIS
BATCH
BATHS
BEACH
BEADS
BEANS
BEARS
BEAST
BEATS
BEGAN
BEGIN
BEGUN
BEING
BELLE
BELLY
BELOW
BELTS
BENCH
BENIN
BERRY
BETTY
BIBLE
BIKES
BILLS
BILLY
BINGO
BIRDS
BIRTH
BLACK
BLADE
BLAIR
BLAKE
BLAME
BLANK
BLAST
BLEND
BLESS
BLIND
BLINK
BLOCK
BLOGS
BLOND
BLOOD
BLOOM
BLUES
BOARD
BOATS
BOBBY
BONDS
BONES
BONUS
BOOKS
BOOST
BOOTH
BOOTS
BOOTY
BORED
BOUND
BOXED
BOXES
BRAID
BRAIN
BRAKE
BRAND
BRASS
BRAVE
BREAD
BREAK
BREED
BRIAN
BRICK
BRIDE
BRIEF
BRING
BROAD
BRODA
BROKE
BROOK
BROOM
BROWN
BRUCE
BRUSH
BRYAN
BUCKS
BUDDY
BUILD
BUILT
BUNCH
BUNNY
BURKE
BURNS
BURST
BUSES
BUTTS
BUYER
BYTES
CABIN
CABLE
CACHE
CAKES
CALLS
CAMEL
CAMPS
CANAL
CANDY
CANON
CARDS
CAREY
CARGO
CARLO
CAROL
CARRY
CASES
CASEY
CASIO
CATCH
CAUSE
CEDAR
CELLS
CENTS
CHAIN
CHAIR
CHAOS
CHARM
CHART
CHASE
CHEAP
CHEAT
CHECK
CHESS
CHEST
CHEVY
CHICK
CHIEF
CHILD
CHILE
CHINA
CHIPS
CHOIR
CHOSE
CHRIS
CHUCK
CINDY
CISCO
CITED
CIVIC
CIVIL
CLAIM
CLARA
CLARK
CLASS
CLEAN
CLEAR
CLERK
CLICK
CLIFF
CLIMB
CLIPS
CLOCK
CLONE
CLOSE
CLOTH
CLOUD
CLUBS
COACH
COAST
CODES
COHEN
COINS
COLIN
COLON
COLOR
COMBO
COMES
COMIC
COMOT
CONDO
CONGO
CONST
CORAL
CORPS
COSTA
COSTS
COULD
COUNT
COURT
COVER
CRACK
CRAFT
CRAIG
CRAPS
CRASH
CRAZY
CREAM
CREEK
CREST
CRIME
CROPS
CROSS
CROWD
CROWN
CRUDE
CUBIC
CURVE
CYBER
CYCLE
CZECH
DADDY
DAILY
DAIRY
DAISY
DANCE
DANFO
DANNY
DATED
DATES
DAVID
DAVIS
DEALS
DEALT
DEATH
DEBUG
DEBUT
DECOR
DELAY
DELHI
DELTA
DENSE
DEPOT
DEPTH
DERBY
DEREK
DEVEL
DEVIL
DEVON
DIANA
DIANE
DIARY
DICKE
DIEGO
DIFFS
DIGIT
DIRTY
DISCO
DISCS
DISKS
DODGE
DOING
DOLLS
DONNA
DONOR
DOORS
DOUBT
DOVER
DOZEN
DRAFT
DRAIN
DRAMA
DRAWN
DRAWS
DREAM
DRESS
DRIED
DRILL
DRINK
DRIVE
DROPS
DROVE
DRUGS
DRUMS
DRUNK
DRYER
DUBAI
DUTCH
DYING
DYLAN
EAGLE
EARLY
EARTH
EBONY
EBOOK
EDDIE
EDGAR
EDGES
EGUSI
EGYPT
EIGHT
EKITI
ELDER
ELECT
ELITE
ELLEN
ELLIS
ELVIS
EMACS
EMAIL
EMILY
EMPTY
ENDED
ENDIF
ENEMY
ENJOY
ENTER
ENTRY
ENUGU
EPSON
EQUAL
ERROR
ESSAY
ESSEX
EUROS
EVANS
EVENT
EVERY
EXACT
EXAMS
EXCEL
EXIST
EXTRA
FACED
FACES
FACTS
FAILS
FAIRY
FAITH
FALLS
FALSE
FANCY
FARES
FARMS
FATAL
FATTY
FAULT
FAVOR
FEARS
FEEDS
FEELS
FENCE
FERRY
FEVER
FEWER
FIBER
FIBRE
FIELD
FIFTH
FIFTY
FIGHT
FILED
FILES
FILME
FILMS
FINAL
FINDS
FIRED
FIRES
FIRMS
FIRST
FIXED
FIXES
FLAGS
FLAME
FLASH
FLEET
FLESH
FLOAT
FLOOD
FLOOR
FLOUR
FLOWS
FLOYD
FLUID
FLUSH
FLYER
FOCAL
FOCUS
FOLKS
FONTS
FOODS
FORCE
FORGE
FORMS
FORTH
FORTY
FORUM
FOTOS
FOUND
FRAME
FRANK
FRAUD
FRESH
FRONT
FROST
FRUIT
FULLY
FUNDS
FUNKY
FUNNY
FUZZY
GAINS
GAMES
GAMMA
GARKI
GARRI
GATES
GAUGE
GENES
GENRE
GHANA
GHOST
GIANT
GIFTS
GIRLS
GIVEN
GIVES
GLASS
GLENN
GLOBE
GLORY
GNOME
GOALS
GOING
GONNA
GOODS
GOTTA
GRACE
GRADE
GRAIN
GRAMS
GRAND
GRANT
GRAPH
GRASS
GRAVE
GREAT
GREEK
GREEN
GRILL
GROSS
GROUP
GROVE
GROWN
GROWS
GUARD
GUAVA
GUESS
GUEST
GUIDE
GUILD
HAIRY
HAITI
HANDS
HANDY
HAPPY
HARRY
HAUSA
HAVEN
HAYES
HEADS
HEARD
HEART
HEATH
HEAVY
HELEN
HELLO
HELPS
HENCE
HENRY
HERBS
HIGHS
HILLS
HINDU
HINTS
HIRED
HOBBY
HOLDS
HOLES
HOLLY
HOMES
HONDA
HONEY
HONOR
HOPED
HOPES
HORSE
HOSTS
HOTEL
HOURS
HOUSE
HOWTO
HUMAN
HUMOR
ICONS
IDAHO
IDEAL
IDEAS
IJEBU
IKEJA
IMAGE
INBOX
INDEX
INDIA
INDIE
INNER
INPUT
INTEL
INTER
INTRO
IRAQI
IRISH
ISAAC
ISLAM
ISSUE
ITALY
ITEMS
IVORY
JACOB
JAMES
JAMIE
JANET
JAPAN
JASON
JEANS
JENNY
JERRY
JESSE
JESUS
JEWEL
JIMMY
JOHNS
JOINS
JOINT
JOKES
JONES
JOYCE
JUDGE
JUICE
JULIA
JULIE
KAREN
KARMA
KATHY
KATIE
KEEPS
KEITH
KELLY
KENNY
KENTE
KENYA
KERRY
KEVIN
KILLS
KILOS
KINDA
KINDS
KINGS
KITTY
KLEIN
KNIFE
KNOCK
KNORR
KNOWN
KNOWS
KODAK
KOREA
KUBWA
LABEL
LABOR
LADEN
LAGOS
LAKES
LAMPS
LANCE
LANDS
LANES
LANKA
LARGE
LARRY
LASER
LATER
LATEX
LATIN
LAUGH
LAURA
LAYER
LEADS
LEARN
LEASE
LEAST
LEAVE
LEEDS
LEGAL
LEKKI
LEMON
LEONE
LEVEL
LEWIS
LEXUS
LIGHT
LIKED
LIKES
LIMIT
LINDA
LINED
LINES
LINKS
LINUX
LIONS
LISTS
LIVED
LIVER
LIVES
LLOYD
LOADS
LOANS
LOBBY
LOCAL
LOCKS
LODGE
LOGAN
LOGIC
LOGIN
LOGOS
LOOKS
LOOPS
LOOSE
LOPEZ
LOTUS
LOUIS
LOVED
LOVER
LOVES
LOWER
LUCAS
LUCIA
LUCKY
LUNCH
LYCOS
LYING
LYRIC
MACRO
MADAM
MAGGI
MAGIC
MAILS
MAINE
MAJOR
MAKER
MAKES
MALES
MALTA
MAMBO
MANGA
MANGO
MANOR
MAPLE
MARCH
MARCO
MARDI
MARIA
MARIE
MARIO
MARKS
MARSH
MASON
MATCH
MAYBE
MAYOR
MAZDA
MEALS
MEANS
MEANT
MEDAL
MEDIA
MEETS
MENUS
MERCY
MERGE
MERIT
MERRY
METAL
METER
METRO
MEYER
MIAMI
MICRO
MIGHT
MILAN
MILES
MILLS
MINDS
MINES
MINOR
MINUS
MIXED
MIXER
MODEL
MODEM
MODES
MOLUE
MONEY
MONTE
MONTH
MOORE
MORAL
MOSES
MOTEL
MOTOR
MOUNT
MOUSE
MOUTH
MOVED
MOVES
MOVIE
MPEGS
MSGID
MULTI
MUSIC
MYERS
MYSQL
NAILS
NAIRA
NAKED
NAMED
NAMES
NANCY
NASTY
NAVAL
NEEDS
NEPAL
NERVE
NEVER
NEWER
NEWLY
NIGER
NIGHT
NIKON
NNEWI
NOBLE
NODES
NOISE
NOKIA
NORTH
NOTED
NOTES
NOTRE
NOVEL
NSALA
NURSE
NYLON
OASIS
OCCUR
OCEAN
OFFER
OFTEN
OKADA
OLDER
OLIVE
OMAHA
OMEGA
ONION
OPENS
OPERA
ORBIT
ORDER
ORGAN
OSCAR
OTHER
OUGHT
OUTER
OWING
OWNED
OWNER
OXIDE
OZONE
PACKS
PAGES
PAINT
PAIRS
PANEL
PANIC
PANTS
PAPER
PAPUA
PARIS
PARKS
PARTS
PARTY
PASTA
PASTE
PATCH
PATHS
PATIO
PAXIL
PAYEE
PEACE
PEARL
PEERS
PENNY
PERRY
PERTH
PETER
PHASE
PHONE
PHOTO
PHPBB
PIANO
PICKS
PIECE
PILLS
PILOT
PIPES
PITCH
PIXEL
PIZZA
PLACE
PLAIN
PLANE
PLANS
PLANT
PLATE
PLAYS
PLAZA
PLOTS
POEMS
POINT
POKER
POLAR
POLLS
PONMO
POOLS
PORTS
POSTS
POUND
POWER
PRESS
PRICE
PRIDE
PRIME
PRINT
PRIOR
PRIZE
PROBE
PROMO
PROOF
PROUD
PROVE
PROXY
PULSE
PUMPS
PUNCH
PUPPY
PURSE
QATAR
QUEEN
QUERY
QUEST
QUEUE
QUICK
QUIET
QUILT
QUITE
QUOTE
RACES
RACKS
RADAR
RADIO
RAISE
RALLY
RALPH
RANCH
RANDY
RANGE
RANKS
RAPID
RATED
RATES
RATIO
REACH
READS
READY
REALM
REBEL
REFER
REHAB
RELAX
RELAY
REMIX
RENEW
REPLY
RESET
RETRO
REUSE
RHODE
RICKY
RIDER
RIDES
RIDGE
RIGHT
RINGS
RISKS
RIVER
ROADS
ROBIN
ROBOT
ROCKS
ROCKY
ROGER
ROLES
ROLLS
ROMAN
ROOMS
ROOTS
ROSES
ROUGE
ROUGH
ROUND
ROUTE
ROVER
ROYAL
RUGBY
RULED
RULES
RURAL
SAFER
SAGEM
SAINT
SALAD
SALEM
SALES
SALLY
SALON
SAMBA
SAMOA
SANDY
SANTA
SANYO
SARAH
SATIN
SAUCE
SAUDI
SAVED
SAVER
SAVES
SBJCT
SCALE
SCARY
SCENE
SCOOP
SCOPE
SCORE
SCOTT
SCOUT
SCREW
SCUBA
SEATS
SEEDS
SEEKS
SEEMS
SELLS
SENDS
SENSE
SERUM
SERVE
SETUP
SEVEN
SHADE
SHAFT
SHAKE
SHAKI
SHALL
SHAME
SHAPE
SHARE
SHARK
SHARP
SHEEP
SHEER
SHEET
SHELF
SHELL
SHIFT
SHINE
SHIPS
SHIRT
SHOCK
SHOES
SHOOT
SHOPS
SHORE
SHORT
SHOTS
SHOWN
SHOWS
SIDES
SIGHT
SIGMA
SIGNS
SILLY
SIMON
SINCE
SINGH
SITES
SIXTH
SIZED
SIZES
SKILL
SKINS
SKIRT
SKYPE
SLAVE
SLEEP
SLIDE
SLOPE
SLOTS
SMALL
SMART
SMELL
SMILE
SMITH
SMOKE
SNAKE
SOCKS
SOLAR
SOLID
SOLVE
SONGS
SONIC
SORRY
SORTS
SOULS
SOUND
SOUTH
SPACE
SPAIN
SPANK
SPARC
SPARE
SPEAK
SPECS
SPEED
SPELL
SPEND
SPENT
SPERM
SPICE
SPIES
SPINE
SPLIT
SPOIL
SPOKE
SPORT
SPOTS
SPRAY
SQUAD
STACK
STAFF
STAGE
STAKE
STALL
STAMP
STAND
STARS
START
STATE
STATS
STAYS
STEAL
STEAM
STEEL
STEPS
STEVE
STICK
STILL
STOCK
STONE
STOOD
STOPS
STORE
STORM
STORY
STRAP
STRIP
STUCK
STUDY
STUFF
STYLE
SUDAN
SUGAR
SUITE
SUITS
SUNNY
SUPER
SURGE
SUSAN
SWEEP
SWEET
SWIFT
SWING
SWISS
SWORD
SYRIA
TABLE
TAHOE
TAKEN
TAKES
TALES
TALKS
TAMIL
TAMPA
TANKS
TAPES
TASKS
TASTE
TAXES
TEACH
TEAMS
TEARS
TEDDY
TEENS
TEETH
TELLS
TERMS
TERRY
TESTS
TEXAS
TEXTS
THANK
THATS
THEFT
THEIR
THEME
THERE
THESE
THETA
THICK
THING
THINK
THIRD
THONG
THOSE
THREE
THROW
THUMB
TIGER
TIGHT
TILES
TIMER
TIMES
TIONS
TIRED
TIRES
TITLE
TODAY
TOKEN
TOKYO
TOMMY
TONER
TONES
TOOLS
TOOTH
TOPIC
TOPUP
TOTAL
TOUCH
TOUGH
TOURS
TOWER
TOWNS
TOXIC
TRACE
TRACK
TRACT
TRACY
TRADE
TRAIL
TRAIN
TRANS
TRASH
TREAT
TREES
TREND
TRIAL
TRIBE
TRICK
TRIED
TRIES
TRIPS
TROUT
TRUCK
TRULY
TRUNK
TRUST
TRUTH
TUBES
TULSA
TUMOR
TUNER
TUNES
TURBO
TURNS
TWICE
TWIKI
TWINS
TWIST
TYLER
TYPES
UKAZI
ULTRA
UNCLE
UNDER
UNION
UNITS
UNITY
UNTIL
UPPER
UPSET
URBAN
USAGE
USERS
USING
USUAL
UTILS
UZIZA
VALID
VALUE
VALVE
VAULT
VEGAS
VENUE
VERDE
VERSE
VIDEO
VIEWS
VILLA
VINYL
VIRAL
VIRUS
VISIT
VISTA
VITAL
VOCAL
VOICE
VOLVO
VOTED
VOTES
VSNET
WAGES
WAGON
WALES
WALKS
WALLS
WANNA
WANTS
WARES
WARRI
WASTE
WATCH
WATER
WATTS
WAVES
WAYNE
WEEKS
WEIRD
WELLS
WELSH
WENDY
WHALE
WHATS
WHEAT
WHEEL
WHERE
WHICH
WHILE
WHITE
WHOLE
WHOSE
WIDER
WIDTH
WILEY
WINDS
WINES
WINGS
WIRED
WIRES
WITCH
WIVES
WOMAN
WOMEN
WOODS
WORDS
WORKS
WORLD
WORRY
WORSE
WORST
WORTH
WOULD
WOUND
WRIST
WRITE
WRONG
WROTE
XANAX
XEROX
XHTML
YACHT
YAHOO
YARDS
YEARS
YEAST
YEMEN
YIELD
YOUNG
YOURS
YOUTH
YUKON
ZDNET
ZONES`.split("\n"), "CRATE"]);
var ROWS = [
	"QWERTYUIOP",
	"ASDFGHJKL",
	"ZXCVBNM"
];
var TILE = {
	correct: "border-green bg-green text-paper",
	present: "border-gold bg-gold text-ink",
	absent: "border-ink-soft bg-ink-soft text-paper",
	empty: "border-line bg-card text-ink",
	typed: "border-ink bg-card text-ink"
};
function WordGuess() {
	const date = (0, import_react.useMemo)(() => lagosDate(), []);
	const answer = (0, import_react.useMemo)(() => dailyAnswer(date), [date]);
	const key = `word-guess:${date}`;
	const [rows, setRows] = (0, import_react.useState)([]);
	const [guess, setGuess] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [shake, setShake] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const filed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadProgress(key);
		if (saved) {
			setRows(saved.rows ?? []);
			setGuess(saved.guess ?? "");
		}
		setReady(true);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveProgress(key, {
			rows,
			guess
		});
	}, [
		ready,
		key,
		rows,
		guess
	]);
	const won = rows.some((row) => row.guess === answer);
	const lost = !won && rows.length >= 6;
	(0, import_react.useEffect)(() => {
		if (!ready || filed.current || !won && !lost) return;
		filed.current = true;
		saveSave(markDaily(loadSave(), "word-guess", date, won));
	}, [
		ready,
		won,
		lost,
		date
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			const onButton = target instanceof HTMLElement && Boolean(target.closest("button"));
			if (event.key === "Enter") {
				if (onButton) return;
				event.preventDefault();
				submit();
			} else if (event.key === "Backspace") {
				event.preventDefault();
				setGuess((current) => current.slice(0, -1));
			} else if (/^[a-z]$/i.test(event.key)) setGuess((current) => current.length >= 5 ? current : (current + event.key).toUpperCase());
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	function bump(text) {
		setMessage(text);
		setShake(true);
		window.setTimeout(() => setShake(false), 280);
	}
	function submit() {
		if (won || lost) return;
		if (guess.length !== 5) {
			bump("Five letters.");
			return;
		}
		if (!GUESSES.has(guess)) {
			bump("Not in the word list.");
			blip(180, .08, "square");
			return;
		}
		const marks = scoreGuess(guess, answer);
		const next = [...rows, {
			guess,
			marks
		}];
		setRows(next);
		setGuess("");
		if (guess === answer) {
			setMessage("Sharp. Same word every shop got today.");
			blip(680, .12);
		} else if (next.length >= 6) {
			setMessage(`It was ${answer}.`);
			blip(150, .12, "triangle");
		} else {
			setMessage("");
			blip(460, .04);
		}
	}
	const letterMark = /* @__PURE__ */ new Map();
	for (const row of rows) row.guess.split("").forEach((letter, index) => {
		const mark = row.marks[index];
		const prev = letterMark.get(letter);
		if (mark === "correct" || !prev || mark === "present" && prev === "absent") letterMark.set(letter, mark);
	});
	async function share() {
		const squares = rows.map((row) => row.marks.map((mark) => mark === "correct" ? "G" : mark === "present" ? "Y" : "B").join("")).join("\n");
		const text = `JKTL Word Guess · ${lagosLabel(date)}\n${won ? `${rows.length}/6` : "X/6"}\n${squares}`;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			setMessage("Could not copy. Screenshot the grid instead.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameFrame, {
		kicker: `Daily · ${lagosLabel(date)}`,
		title: "Word Guess",
		help: "Guess the five-letter word in six tries. Green means right letter, right place. Gold means the letter is in the word. Cocoa means it is not. Today's word is shared by every shop on Lagos time.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mx-auto grid max-w-sm gap-2 ${shake ? "animate-shake" : ""}`,
				"aria-label": "Guesses",
				children: Array.from({ length: 6 }, (_, rowIndex) => {
					const row = rows[rowIndex];
					const live = rowIndex === rows.length && !won && !lost;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5 gap-2",
						children: Array.from({ length: 5 }, (_, col) => {
							const letter = row?.guess[col] ?? (live ? guess[col] : "") ?? "";
							const tone = row ? TILE[row.marks[col]] : letter ? TILE.typed : TILE.empty;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex aspect-square items-center justify-center rounded-xl border-2 text-2xl font-bold ${tone} ${row ? "animate-pop" : ""}`,
								children: letter
							}, col);
						})
					}, rowIndex);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "mt-4 min-h-6 text-center text-sm text-muted",
				children: message
			}),
			won || lost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinNote, {
				title: won ? "In the book." : "Tomorrow's word is new.",
				text: won ? `Solved in ${rows.length} of 6.` : `The word was ${answer}.`,
				onShare: () => void share(),
				copied
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-2 max-w-lg",
				children: [ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-center gap-1",
					children: row.split("").map((letter) => {
						const mark = letterMark.get(letter);
						const tone = mark ? TILE[mark] : "border-line bg-card text-ink";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `h-12 min-w-0 flex-1 rounded-lg border text-sm font-bold ${tone}`,
							onClick: () => setGuess((current) => current.length >= 5 ? current : current + letter),
							children: letter
						}, letter);
					})
				}, row)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						onClick: () => setGuess((current) => current.slice(0, -1)),
						"aria-label": "Delete",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: submit,
						children: "Enter"
					})]
				})]
			})
		]
	});
}
function Play() {
	const { slug } = Route.useParams();
	const game = gameBySlug(slug);
	(0, import_react.useEffect)(() => {
		document.title = game ? `${game.name} · JKTL Games` : "JKTL Games";
	}, [game]);
	if (slug === "word-guess") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordGuess, {});
	if (slug === "word-groups") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordGroups, {});
	if (slug === "scramble") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scramble, {});
	if (slug === "riddle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Riddle, {});
	if (slug === "whot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhotBoard, {});
	if (slug === "ayo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AyoBoard, {});
	if (slug === "memory") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryBoard, {});
	if (slug === "till") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TillBoard, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "That game is not on the shelf."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 font-semibold text-green",
			children: "Back to all games"
		})]
	});
}
//#endregion
export { Play as component };
