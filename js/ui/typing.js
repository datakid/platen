import { store } from "../store.js";
import { loadLanguage, byId, find, plates, neighbor, addressOf, letter } from "../content/registry.js";
import { lexers } from "../engine/langs.js";
import { Plate } from "../engine/plate.js";
import { plateStats, fmtTime, keyTicks, hesitations } from "../engine/metrics.js";
import { createInput } from "../engine/input.js";
import { enter, record } from "../engine/session.js";
import { click } from "../engine/sound.js";
import { createTape } from "./tape.js";
import { createMarginalia } from "./marginalia.js";
import { esc } from "../util.js";

const TOUCH = "(max-width: 759px), ((pointer: coarse) and (not (any-pointer: fine)))";

export async function mount(root, r, ctx) {
  const data = await loadLanguage(r.lang);
  const meta = byId(r.lang);
  const p = data && find(data, r.topic, r.concept, r.variant);
  if (!p) {
    root.innerHTML = '<p class="empty">no data yet</p>';
    return () => {};
  }

  ctx.crumb([
    { t: meta.name.toLowerCase(), href: `#/index/${meta.id}` },
    { t: p.topic.title, href: `#/index/${meta.id}` },
    { t: `${p.concept.title} · ${letter(p.vi)}` }
  ]);
  store.update((s) => {
    s.cursor = { mode: "blocks", lang: r.lang, topic: r.topic, concept: r.concept, variant: r.variant };
  });

  const sessionKey = `${r.lang}/${r.topic}/${r.concept}`;
  enter(sessionKey);

  let s = store.state.settings;
  const readOnly = matchMedia(TOUCH).matches;
  const indent = data.indent || 4;
  const all = plates(data);
  const sibs = all.filter((x) => x.concept === p.concept);
  const isLast = p.vi === sibs.length - 1;
  const after1 = all[sibs[sibs.length - 1].i + 1];
  const nextHref = after1 ? addressOf(after1) : `#/index/${meta.id}`;
  const againHref = addressOf(sibs[0]);
  const rec = store.state.plates;
  const vars = sibs
    .map((x) => `<a class="v${x.vi === p.vi ? " on" : ""}" href="${addressOf(x)}">${letter(x.vi)} <i>${rec[x.id] && rec[x.id].runs ? "●" : "○"}</i></a>`)
    .join("");

  root.innerHTML = `<section class="plate" data-notes="${s.notes}" data-tape="${s.tape ? "on" : "off"}">
<header class="ph"><span class="pn">${esc(p.label)}</span><span class="pm"><span>level ${p.concept.level}</span><nav class="vars" aria-label="variants">${vars}</nav></span><h1 class="pt">${esc(p.concept.title)}</h1><p class="gloss">${esc(p.concept.gloss)}</p></header>
<div class="stage"><div class="gut" aria-hidden="true"></div><div class="code"><i class="cm tl"></i><i class="cm tr"></i><i class="cm bl"></i><i class="cm br"></i><div class="lines"></div><i class="caret"></i></div><aside class="margin" aria-label="notes"></aside><svg class="leaders" aria-hidden="true"></svg><div class="veil">click or press any key</div></div>
<ol class="notelist" aria-label="notes"></ol>
<div class="ro"><span class="live">start typing</span><span class="result" aria-live="polite"></span></div>
<p class="kbnote">platen needs a physical keyboard</p>
<p class="hints">esc again · ⏎ next · ctrl ← → plates · ⌘k jump</p>
<canvas class="tape" aria-hidden="true"></canvas>
</section>`;

  const plateEl = root.querySelector(".plate");
  const stage = root.querySelector(".stage");
  const gutEl = root.querySelector(".gut");
  const codeEl = root.querySelector(".code");
  const linesEl = root.querySelector(".lines");
  const caret = root.querySelector(".caret");
  const liveEl = root.querySelector(".live");
  const resultEl = root.querySelector(".result");
  const tape = createTape(root.querySelector(".tape"));

  let plate = makePlate();
  let spans = [];
  let nls = [];
  let gutRows = [];
  let curLine = -1;
  let chW = 10;
  let lineH = 31;
  let started = false;
  let liveT = 0;
  let idleT = 0;

  const marg = createMarginalia({
    stage,
    margin: root.querySelector(".margin"),
    svg: root.querySelector(".leaders"),
    list: root.querySelector(".notelist"),
    plate: () => plate,
    spans: () => spans,
    metrics: () => ({ chW, lineH })
  });

  function makePlate() {
    return new Plate(p.example, lexers[data.lexer], {
      indent,
      autoIndent: s.autoIndent,
      comments: s.comments,
      errorMode: s.errorMode
    });
  }

  function disp(c) {
    if (c.cls === "nl") return "↵";
    if (c.skip && c.lead && s.whitespace) return "·";
    return c.ch;
  }

  function paint(i) {
    const c = plate.cells[i];
    const el = spans[i];
    el.className = `c c-${c.cls} s-${c.state}`;
    if (c.state === "ok" || c.state === "fixed") {
      void getComputedStyle(el).color;
      el.classList.add("dev");
    }
  }

  function renderLines() {
    linesEl.textContent = "";
    gutEl.textContent = "";
    spans = [];
    nls = [];
    gutRows = [];
    curLine = -1;
    plate.lines.forEach((L, l) => {
      const ln = document.createElement("div");
      ln.className = "ln";
      let lead = 0;
      while (lead < L.end - L.start && plate.cells[L.start + lead].ch === " ") lead++;
      for (let k = 0; k < Math.floor(lead / indent); k++) {
        const g = document.createElement("i");
        g.className = "g";
        g.style.left = `${k * indent}ch`;
        ln.append(g);
      }
      for (let i = L.start; i <= L.end && i < plate.cells.length; i++) {
        const sp = document.createElement("span");
        sp.textContent = disp(plate.cells[i]);
        ln.append(sp);
        spans[i] = sp;
        if (plate.cells[i].cls === "nl") nls[l] = sp;
        paint(i);
      }
      linesEl.append(ln);
      const gr = document.createElement("div");
      gr.textContent = String(l + 1);
      gutEl.append(gr);
      gutRows[l] = gr;
    });
    marg.build();
  }

  function measure() {
    const probe = document.createElement("div");
    probe.className = "ln probe";
    probe.innerHTML = `<span>${"M".repeat(100)}</span>`;
    linesEl.append(probe);
    chW = probe.firstChild.getBoundingClientRect().width / 100;
    lineH = probe.getBoundingClientRect().height;
    probe.remove();
    place();
    marg.layout();
    tape.size();
  }

  function place() {
    if (plate.done) {
      caret.style.display = "none";
      marg.activate(null);
      return;
    }
    caret.style.display = "";
    const c = plate.cells[plate.pos];
    let col = c.col;
    if (c.cls === "nl") {
      for (let j = plate.pos - 1; j >= 0 && plate.cells[j].skip && plate.cells[j].line === c.line; j--) col = plate.cells[j].col;
    }
    const x = col * chW;
    const y = c.line * lineH;
    caret.style.transform = `translate(${x}px, ${y}px)`;
    if (input) input.moveTo(x, y);
    marg.activate(c.noteIdx);
    if (c.line !== curLine) {
      if (gutRows[curLine]) gutRows[curLine].classList.remove("cur");
      if (nls[curLine]) nls[curLine].classList.remove("cur");
      curLine = c.line;
      if (gutRows[curLine]) gutRows[curLine].classList.add("cur");
      if (nls[curLine]) nls[curLine].classList.add("cur");
    }
  }

  function pulse() {
    caret.classList.remove("idle");
    clearTimeout(idleT);
    idleT = setTimeout(() => caret.classList.add("idle"), 1000);
  }

  function flash(i) {
    const el = spans[i];
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 120);
  }

  function live() {
    if (!started || plate.done) return;
    if (!s.liveStats) {
      liveEl.textContent = "";
      return;
    }
    const st = plateStats(plate, performance.now());
    liveEl.textContent = `${st.ms < 1500 ? 0 : Math.round(st.wpm)} wpm · ${(st.acc * 100).toFixed(1)}% · ${fmtTime(st.ms)}`;
  }

  function snapshot(st) {
    const errs = [];
    const seen = new Set();
    for (const e of plate.log) {
      if (e.bs || e.ok || seen.has(e.pos)) continue;
      seen.add(e.pos);
      errs.push([plate.cells[e.pos].line, plate.cells[e.pos].col]);
    }
    const classes = {};
    for (const k of Object.keys(st.classes)) classes[k] = [st.classes[k].n, st.classes[k].ok];
    return {
      id: p.id,
      label: p.label,
      href: addressOf(p),
      code: plate.code,
      errs,
      ms: Math.round(st.ms),
      correct: st.correct,
      keys: st.keys,
      good: st.good,
      series: st.series,
      ticks: keyTicks(plate),
      hes: hesitations(plate),
      classes,
      wpm: Math.round(st.wpm * 10) / 10,
      acc: Math.round(st.acc * 1000) / 10
    };
  }

  function save(st) {
    store.update((state) => {
      const o = state.plates[p.id] || (state.plates[p.id] = { runs: 0, bestWpm: 0, bestAcc: 0, lastAt: 0, accHistory: [] });
      const wpm = Math.round(st.wpm * 10) / 10;
      const acc = Math.round(st.acc * 1000) / 10;
      o.runs++;
      o.bestWpm = Math.max(o.bestWpm, wpm);
      o.bestAcc = Math.max(o.bestAcc, acc);
      o.lastAt = Date.now();
      o.accHistory = [...o.accHistory, acc].slice(-5);
      state.sessions.push({
        at: Date.now(),
        mode: "blocks",
        lang: r.lang,
        wpm,
        acc,
        raw: Math.round(st.raw * 10) / 10,
        cons: Math.round(st.cons),
        ms: Math.round(st.ms),
        plates: [p.id]
      });
      state.sessions = state.sessions.slice(-500);
    });
    record(
      { key: sessionKey, lang: r.lang, topic: r.topic, concept: r.concept, title: p.concept.title, next: nextHref, again: againHref },
      snapshot(st)
    );
  }

  function finish() {
    clearInterval(liveT);
    const st = plateStats(plate);
    plateEl.classList.add("done");
    resultEl.innerHTML = `<span><span class="n">${Math.round(st.wpm)}</span>wpm</span><span><span class="n">${(st.acc * 100).toFixed(1)}</span>% acc</span><span class="n">${fmtTime(st.ms)}</span><span>symbols ${Math.round(st.symbols * 100)}%</span><button type="button" class="act" data-a="again">esc again</button><button type="button" class="act" data-a="next">⏎ next</button>`;
    const dot = root.querySelector(".vars a.on i");
    if (dot) dot.textContent = "●";
    save(st);
  }

  function tick(before) {
    if (plate.log.length === before) return;
    const L = plate.log;
    const e = L[L.length - 1];
    if (e.bs) return;
    const pe = L[L.length - 2];
    tape.push(pe ? e.t - pe.t : null, e.ok);
    if (s.sound === "click") click();
  }

  function after(res) {
    if (!res) return;
    pulse();
    if (!started && plate.t0) {
      started = true;
      if (s.focus) document.body.classList.add("typing");
      live();
      liveT = setInterval(live, 250);
    }
    res.changed.forEach(paint);
    if (res.rejected !== undefined) flash(res.rejected);
    place();
    if (plate.done) finish();
  }

  function again() {
    plate.reset();
    started = false;
    clearInterval(liveT);
    plate.cells.forEach((_, i) => paint(i));
    plateEl.classList.remove("done");
    resultEl.textContent = "";
    liveEl.textContent = "start typing";
    document.body.classList.remove("typing");
    tape.reset();
    curLine = -1;
    place();
    pulse();
  }

  function go(d) {
    const n = neighbor(data, p, d);
    if (n) location.hash = addressOf(n);
  }

  function advance() {
    if (isLast) location.hash = "#/proof/last";
    else go(1);
  }

  const input = readOnly
    ? null
    : createInput(codeEl, {
        text(ch) {
          if (plate.done) {
            if (ch === "\n") advance();
            return;
          }
          const n = plate.log.length;
          const res = plate.type(ch, performance.now());
          tick(n);
          after(res);
        },
        back(word) {
          if (plate.done) return;
          const t = performance.now();
          after(word ? plate.backspaceWord(t) : plate.backspace(t));
        },
        tab() {
          if (s.autoIndent || plate.done) return;
          for (let k = 0; k < indent; k++) {
            const n = plate.log.length;
            const res = plate.type(" ", performance.now());
            tick(n);
            after(res);
          }
        },
        esc() {
          again();
        },
        step(d) {
          go(d);
        },
        focus(on) {
          plateEl.classList.toggle("blurred", !on);
        }
      });

  renderLines();
  measure();
  pulse();
  if (readOnly) caret.style.display = "none";

  const onSettings = () => {
    s = store.state.settings;
    plate.strict = s.errorMode === "strict";
    plateEl.dataset.notes = s.notes;
    plateEl.dataset.tape = s.tape ? "on" : "off";
    if (!plate.t0) {
      plate = makePlate();
      renderLines();
    }
    tape.refresh();
    measure();
  };
  const onKey = (e) => {
    if (!input || e.ctrlKey || e.metaKey || e.altKey) return;
    const a = document.activeElement;
    if (a && a !== document.body) return;
    if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") input.focus();
  };
  const onMove = (e) => {
    if (Math.abs(e.movementX) + Math.abs(e.movementY) > 3) document.body.classList.remove("typing");
  };
  const onResult = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.a === "again") {
      again();
      if (input) input.focus();
    } else advance();
  };

  document.addEventListener("platen:settings", onSettings);
  document.addEventListener("keydown", onKey);
  document.addEventListener("mousemove", onMove);
  addEventListener("resize", measure);
  resultEl.addEventListener("click", onResult);
  if (input) {
    stage.addEventListener("mousedown", (e) => {
      e.preventDefault();
      input.focus();
    });
    requestAnimationFrame(() => input.focus());
  }
  document.fonts.ready.then(measure);
  if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", measure);

  return () => {
    clearInterval(liveT);
    clearTimeout(idleT);
    if (input) input.destroy();
    tape.destroy();
    document.removeEventListener("platen:settings", onSettings);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("mousemove", onMove);
    removeEventListener("resize", measure);
    if (document.fonts.removeEventListener) document.fonts.removeEventListener("loadingdone", measure);
    document.body.classList.remove("typing");
  };
}
