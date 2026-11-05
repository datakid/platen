import { store } from "../store.js";
import { byId } from "../content/registry.js";
import { fmtTime } from "../engine/metrics.js";
import { createTape } from "./tape.js";
import { esc } from "../util.js";

const CLASSES = [
  ["keyword", "keyword"],
  ["ident", "identifier"],
  ["punct", "symbol"],
  ["string", "string"],
  ["number", "number"],
  ["nl", "newline"]
];

export function mount(root, r, ctx) {
  const last = store.state.last;
  if (!last || !last.plates || !last.plates.length) {
    root.innerHTML = '<p class="empty">no data yet</p>';
    return () => {};
  }
  const meta = byId(last.lang);
  if (meta) document.body.dataset.pg = meta.pigment;
  ctx.crumb([
    { t: meta ? meta.name.toLowerCase() : last.lang, href: `#/index/${last.lang}` },
    { t: last.title },
    { t: "proof" }
  ]);

  const P = last.plates;
  const sum = (f) => P.reduce((a, p) => a + f(p), 0);
  const ms = sum((p) => p.ms);
  const min = Math.max(ms, 1) / 60000;
  const keys = sum((p) => p.keys);
  const wpm = sum((p) => p.correct) / 5 / min;
  const raw = keys / 5 / min;
  const acc = keys ? sum((p) => p.good) / keys : 1;
  const series = P.flatMap((p) => p.series);
  const full = series.length > 2 ? series.slice(0, -1) : series;
  const mean = full.reduce((a, b) => a + b, 0) / Math.max(full.length, 1);
  const sd = Math.sqrt(full.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(full.length, 1));
  const cons = full.length < 2 || mean === 0 ? 100 : Math.max(0, 100 * (1 - sd / mean));

  const big = [
    ["wpm", Math.round(wpm)],
    ["acc", `${(acc * 100).toFixed(1)}%`],
    ["raw", Math.round(raw)],
    ["consistency", `${Math.round(cons)}%`],
    ["time", fmtTime(ms)]
  ]
    .map(([l, v]) => `<div><span class="bn">${v}</span><span class="bl">${l}</span></div>`)
    .join("");

  const thumbs = P.map((p) => {
    const n = p.code.split("\n").length;
    const dots = p.errs.map(([l, c]) => `<i style="left:${(c * 3.6).toFixed(1)}px;top:${l * 8 + 2}px"></i>`).join("");
    return `<a class="thumb" href="${p.href}"><span class="tc" style="height:${n * 8}px"><pre>${esc(p.code)}</pre>${dots}</span><span class="tl">${esc(p.label)} · ${Math.round(p.wpm)}</span></a>`;
  }).join("");

  const hes = {};
  for (const p of P) {
    for (const [u, [n, t]] of Object.entries(p.hes)) {
      const o = hes[u] || (hes[u] = [0, 0]);
      o[0] += n;
      o[1] += t;
    }
  }
  let rows = Object.entries(hes).map(([u, [n, t]]) => ({ u, n, ms: Math.round(t / n) }));
  const solid = rows.filter((x) => x.n >= 2);
  if (solid.length >= 6) rows = solid;
  rows.sort((a, b) => b.ms - a.ms);
  const hesHtml = rows.length
    ? `<table class="hes">${rows
        .slice(0, 6)
        .map((x) => `<tr><td>${esc(x.u)}</td><td>${x.ms}ms</td><td>×${x.n}</td></tr>`)
        .join("")}</table>`
    : '<p class="dim">no data yet</p>';

  const agg = {};
  for (const p of P) {
    for (const [k, [n, ok]] of Object.entries(p.classes)) {
      const o = agg[k] || (agg[k] = [0, 0]);
      o[0] += n;
      o[1] += ok;
    }
  }
  const bars = CLASSES.filter(([k]) => agg[k] && agg[k][0])
    .map(([k, label]) => {
      const pct = (agg[k][1] / agg[k][0]) * 100;
      return `<div class="bar"><span>${label}</span><i><b style="width:${pct.toFixed(1)}%"></b></i><span>${pct.toFixed(1)}%</span></div>`;
    })
    .join("");

  root.innerHTML = `<div class="proof">
<div class="big">${big}</div>
<canvas class="ptape" aria-hidden="true"></canvas>
<section class="ps"><h2>plates</h2><div class="thumbs">${thumbs}</div></section>
<section class="ps"><h2>hesitations</h2>${hesHtml}</section>
<section class="ps"><h2>accuracy by token class</h2><div class="bars">${bars}</div></section>
<p class="acts"><a href="${last.next}">⏎ next concept</a><a href="${last.again}">esc again</a><a href="#/drill/${last.lang}">d drill weak keys</a></p>
</div>`;

  const tape = createTape(root.querySelector(".ptape"), { fit: true });
  const paint = () => {
    tape.size();
    tape.set(P.flatMap((p) => p.ticks), series);
  };
  paint();

  const onKey = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const a = document.activeElement;
    if (a && a !== document.body && a.tagName === "INPUT") return;
    if (e.key === "Enter") location.hash = last.next;
    else if (e.key === "Escape") location.hash = last.again;
    else if (e.key === "d") location.hash = `#/drill/${last.lang}`;
  };
  const onSettings = () => {
    tape.refresh();
    paint();
  };
  document.addEventListener("keydown", onKey);
  document.addEventListener("platen:settings", onSettings);
  addEventListener("resize", paint);
  document.fonts.ready.then(paint);

  return () => {
    tape.destroy();
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("platen:settings", onSettings);
    removeEventListener("resize", paint);
  };
}
