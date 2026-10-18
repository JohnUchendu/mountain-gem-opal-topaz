import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as lagosDate, d as loadSave, l as lagosLabel, n as TopBar, r as activeStreak, s as hasProgress, t as GAMES } from "./top-bar-B0mcagb-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C6CQVn72.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const today = (0, import_react.useMemo)(() => lagosDate(), []);
	const [save, setSave] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setSave(loadSave());
	}, []);
	const dailies = GAMES.filter((game) => game.daily);
	const arcade = GAMES.filter((game) => !game.daily);
	const streak = save ? activeStreak(save.visit, today) : 0;
	const solved = dailies.filter((game) => {
		const row = save?.dailies[game.slug];
		return row?.date === today && row.won;
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen w-full max-w-5xl px-4 pb-16 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-xs font-semibold uppercase tracking-widest text-green",
				children: "For the gap between customers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-xl font-display text-4xl leading-none text-ink sm:text-5xl",
					children: "Play a short one."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: lagosLabel(today)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base leading-relaxed text-muted",
				children: "Four daily puzzles, the same for every shop on Lagos time, plus Whot, Ayo, a market memory, and a till that checks your change."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-ink px-3 py-1.5 font-semibold text-paper",
					children: streak > 0 ? `${streak}-day streak` : "Streak starts today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-green-soft px-3 py-1.5 font-semibold text-green",
					children: [solved, "/4 dailies solved"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "Today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: dailies.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
						slug: game.slug,
						name: game.name,
						blurb: game.blurb,
						time: game.time,
						icon: game.icon,
						status: dailyStatus(game.slug, today, save)
					}, game.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "Anytime"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: arcade.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {
						slug: game.slug,
						name: game.name,
						blurb: game.blurb,
						time: game.time,
						icon: game.icon,
						status: arcadeStatus(game.slug, save)
					}, game.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Made for people who run shops on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "font-semibold text-ink underline",
						href: "https://jktl.com.ng",
						children: "JKTL"
					}),
					". Puzzles roll over at midnight in Lagos. Scores stay on this phone."
				] })
			})
		]
	});
}
function dailyStatus(id, today, save) {
	const row = save?.dailies[id];
	if (row?.date === today && row.won) return "Solved";
	if (row?.date === today) return "Played";
	if (save && hasProgress(`${id}:${today}`)) return "In play";
	return "Today";
}
function arcadeStatus(slug, save) {
	if (!save) return "Play";
	if (slug === "whot") return save.arcade.whotGames ? `${save.arcade.whotWins} wins` : "Deal a hand";
	if (slug === "ayo") return save.arcade.ayoGames ? `${save.arcade.ayoWins} wins` : "Sow the seeds";
	if (slug === "memory") return save.arcade.memoryBest != null ? `Best ${save.arcade.memoryBest} moves` : "Flip the stall";
	if (slug === "till") return save.arcade.tillBest > 0 ? `Best ${save.arcade.tillBest}` : "Open the till";
	return "Play";
}
function GameCard({ slug, name, blurb, time, icon: Icon, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/play/$slug",
		params: { slug },
		className: "flex min-h-36 flex-col justify-between rounded-3xl border border-line bg-card p-4 text-ink shadow-sm transition active:scale-[0.99]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 place-items-center rounded-2xl bg-gold-soft text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-5",
					"aria-hidden": true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-muted",
				children: status
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-4 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl leading-none",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted",
					children: time
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-sm leading-relaxed text-muted",
				children: blurb
			})]
		})]
	});
}
//#endregion
export { Home as component };
