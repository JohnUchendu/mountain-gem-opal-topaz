import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CircleHelp, b as Banknote, c as Shapes, d as Layers, i as Volume2, o as Shuffle, r as VolumeX, t as WholeWord, u as LayoutGrid, v as CircleDot, y as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/top-bar-B0mcagb-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GAMES = [
	{
		slug: "word-guess",
		name: "Word Guess",
		blurb: "Six tries for a five-letter shop word. Same word for every shop today.",
		time: "3 min",
		icon: WholeWord,
		daily: true
	},
	{
		slug: "word-groups",
		name: "Word Groups",
		blurb: "Find four groups of four. Soups, markets, pidgin, and the till.",
		time: "4 min",
		icon: LayoutGrid,
		daily: true
	},
	{
		slug: "scramble",
		name: "Scramble",
		blurb: "Untangle a Naija word before the next customer walks in.",
		time: "2 min",
		icon: Shuffle,
		daily: true
	},
	{
		slug: "riddle",
		name: "Riddle",
		blurb: "A short clue. The answer is usually closer to the shop than you think.",
		time: "2 min",
		icon: CircleHelp,
		daily: true
	},
	{
		slug: "whot",
		name: "Whot",
		blurb: "Shed your hand before the computer. Pick two, hold on, last card.",
		time: "5 min",
		icon: Shapes,
		daily: false
	},
	{
		slug: "ayo",
		name: "Ayo",
		blurb: "Sow the seeds. Capture twos and threes. First to 25 takes the board.",
		time: "8 min",
		icon: CircleDot,
		daily: false
	},
	{
		slug: "memory",
		name: "Market Memory",
		blurb: "Flip the stall and match the goods. Fewer moves, sharper memory.",
		time: "2 min",
		icon: Layers,
		daily: false
	},
	{
		slug: "till",
		name: "Till Rush",
		blurb: "A customer paid with a note. Give the exact change before the minute goes.",
		time: "1 min",
		icon: Banknote,
		daily: false
	}
];
function gameBySlug(slug) {
	return GAMES.find((game) => game.slug === slug);
}
function lagosDate(now = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Africa/Lagos",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(now);
}
function lagosLabel(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-NG", {
		weekday: "long",
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	});
}
function daysBetween(earlier, later) {
	if (!earlier || !later) return 999;
	const a = Date.parse(`${earlier}T00:00:00Z`);
	const b = Date.parse(`${later}T00:00:00Z`);
	return Math.round((b - a) / 864e5);
}
function dateSeed(key) {
	let h = 2166136261;
	for (let i = 0; i < key.length; i++) {
		h ^= key.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function seededShuffle(items, seed) {
	const rnd = mulberry32(seed);
	const arr = items.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rnd() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
var SAVE_KEY = "jktl-games-v1";
var PROGRESS_KEY = "jktl-progress-v1";
function emptySave() {
	return {
		version: 1,
		dailies: {},
		streaks: {},
		visit: {
			current: 0,
			best: 0,
			lastDate: ""
		},
		arcade: {
			whotWins: 0,
			whotGames: 0,
			ayoWins: 0,
			ayoGames: 0,
			memoryBest: null,
			tillBest: 0
		}
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return emptySave();
		const parsed = JSON.parse(raw);
		if (parsed.version !== 1 || !parsed.arcade || !parsed.visit) return emptySave();
		return parsed;
	} catch {
		return emptySave();
	}
}
function saveSave(save) {
	try {
		localStorage.setItem(SAVE_KEY, JSON.stringify(save));
	} catch {}
}
function markDaily(save, game, date, won) {
	const previous = save.dailies[game];
	const wonToday = won || previous?.date === date && previous.won;
	const next = {
		...save,
		dailies: {
			...save.dailies,
			[game]: {
				date,
				won: wonToday
			}
		}
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
		streaks: {
			...save.streaks,
			[game]: {
				current,
				best,
				lastDate: date
			}
		},
		visit: {
			current: visitCurrent,
			best: Math.max(visit.best, visitCurrent),
			lastDate: date
		}
	};
}
function activeStreak(streak, today) {
	if (!streak?.lastDate) return 0;
	const gap = daysBetween(streak.lastDate, today);
	if (gap === 0 || gap === 1) return streak.current;
	return 0;
}
function readProgress() {
	try {
		const raw = localStorage.getItem(PROGRESS_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function loadProgress(key) {
	const value = readProgress()[key];
	return value == null ? null : value;
}
function saveProgress(key, value) {
	try {
		const all = readProgress();
		all[key] = value;
		localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
	} catch {}
}
function hasProgress(key) {
	return readProgress()[key] != null;
}
var KEY = "jktl-sound";
var ctx = null;
function soundEnabled() {
	try {
		return localStorage.getItem(KEY) !== "0";
	} catch {
		return true;
	}
}
function setSoundEnabled(on) {
	try {
		localStorage.setItem(KEY, on ? "1" : "0");
	} catch {}
}
function blip(freq = 520, dur = .06, type = "sine") {
	if (!soundEnabled()) return;
	try {
		if (!ctx) ctx = new AudioContext();
		if (ctx.state === "suspended") ctx.resume();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		gain.gain.value = .045;
		osc.connect(gain);
		gain.connect(ctx.destination);
		const now = ctx.currentTime;
		gain.gain.setValueAtTime(.045, now);
		gain.gain.exponentialRampToValueAtTime(1e-4, now + dur);
		osc.start(now);
		osc.stop(now + dur);
	} catch {}
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "inline-flex min-h-11 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 place-items-center rounded-lg bg-green text-sm font-bold text-paper",
			children: "J"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-xl leading-none text-ink",
			children: ["JKTL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-green",
				children: "Games"
			})]
		})]
	});
}
function TopBar({ back = false }) {
	const [on, setOn] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setOn(soundEnabled());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [back ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
				className: "size-5",
				"aria-hidden": true
			}), "All games"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": on,
			"aria-label": on ? "Mute sounds" : "Turn sounds on",
			className: "grid size-11 place-items-center rounded-full border border-line bg-card text-ink",
			onClick: () => {
				const next = !on;
				setOn(next);
				setSoundEnabled(next);
			},
			children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" })
		})]
	});
}
//#endregion
export { dateSeed as a, lagosDate as c, loadSave as d, markDaily as f, seededShuffle as g, saveSave as h, blip as i, lagosLabel as l, saveProgress as m, TopBar as n, gameBySlug as o, mulberry32 as p, activeStreak as r, hasProgress as s, GAMES as t, loadProgress as u };
