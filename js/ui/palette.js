import { registry, byId, loadLanguage, plates, addressOf, readyIds, letter } from "../content/registry.js";
import { conceptState } from "../content/progress.js";
import { store } from "../store.js";
import { esc, pad } from "../util.js";

let current = null;
const progress = new Map();

const ALIASES = {
  python: ["py", "python3"],
  javascript: ["js", "node", "ecmascript"],
  typescript: ["ts"],
  csharp: ["cs", "c#", "dotnet"],
  cpp: ["c++", "cc"],
  go: ["golang"],
  rust: ["rs"],
  bash: ["sh", "shell", "zsh"],
  powershell: ["pwsh", "ps1"],
  sql: ["postgres", "sqlite"],
  dockerfile: ["docker"],
  sklearn: ["scikit", "scikit-learn"],
  pytorch: ["torch"],
  numpy: ["np"],
  pandas: ["pd", "dataframe"],
  polars: ["pl"],
  react: ["jsx", "reactjs"],
  vue: ["vuejs"],
  angular: ["ng"],
  express: ["expressjs"],
  django: ["dj"],
  html: ["markup"],
  css: ["stylesheet"]
};

const lastPlate = (id) => {
  const w = store.state.where && store.state.where[id];
  if (w) return { at: w.at, hash: `#/t/${id}/${w.topic}/${w.concept}/${w.variant}` };
  const cur = store.state.cursor;
  if (cur && cur.lang === id) return { at: Number.MAX_SAFE_INTEGER, hash: `#/t/${id}/${cur.topic}/${cur.concept}/${cur.variant}` };
  const pre = `${id}/`;
  let best = null;
  for (const [k, r] of Object.entries(store.state.plates)) {
    if (!k.startsWith(pre) || (best && r.lastAt <= best.at)) continue;
    const [, topic, concept, vi] = k.split("/");
    best = { at: r.lastAt, hash: `#/t/${id}/${topic}/${concept}/${letter(Number(vi))}` };
  }
  return best;
};

async function openLanguage(id, alt, p) {
  if (alt) {
    location.hash = `#/index/${id}`;
    return;
  }
  if (p) {
    location.hash = p.hash;
    return;
  }
  const d = await loadLanguage(id);
  const first = d && plates(d)[0];
  location.hash = first ? addressOf(first) : `#/index/${id}`;
}

function languageItems() {
  const here = document.body.dataset.pg || null;
  const ready = new Set(readyIds());
  return registry
    .filter((l) => ready.has(l.id))
    .map((l) => ({ l, p: lastPlate(l.id) }))
    .sort((a, b) => (b.p ? b.p.at : -1) - (a.p ? a.p.at : -1))
    .map(({ l, p }) => {
      const names = [l.short, l.id, ...(ALIASES[l.id] || [])].map((k) => k.toLowerCase());
      const parent = l.family ? byId(l.family).name : "";
      return {
        kind: "language",
        id: l.id,
        l,
        here: l.id === here,
        label: l.name.toLowerCase(),
        keys: names,
        hay: `${names.join(" ")} ${l.name} ${parent}`.toLowerCase(),
        run: (alt) => openLanguage(l.id, alt, p)
      };
    });
}

const langRow = (it, i, on) => {
  const par = it.l.family ? `<span class="par">· ${esc(byId(it.l.family).short.toLowerCase())}</span>` : "";
  return `<li role="option" data-i="${i}" aria-selected="${on}" class="lg${on ? " sel" : ""}" style="--pgc: var(--pg-${it.l.pigment})"><i class="sq"></i><span class="sh">${esc(it.l.short)}</span><span class="pl">${esc(it.label)}${par}</span><span class="pr" data-l="${it.id}">${esc(progress.get(it.id) || "")}</span><span class="ph2">${esc(it.l.version)}</span><span class="pk">${it.here ? "now" : ""}</span></li>`;
};

function fillProgress(wrap, ul) {
  for (const id of readyIds()) {
    loadLanguage(id).then((d) => {
      if (!d) return;
      const all = d.topics.flatMap((t) => t.concepts);
      const done = all.filter((c) => conceptState(d, c, store.state.plates) === "learned").length;
      progress.set(id, `${done}/${all.length}`);
      const el = wrap.isConnected && ul.querySelector(`.pr[data-l="${id}"]`);
      if (el) el.textContent = progress.get(id);
    });
  }
}

const go = (h) => () => {
  location.hash = h;
};
const set = (k, v) => () => {
  store.update((s) => {
    s.settings[k] = v;
  });
  document.dispatchEvent(new CustomEvent("platen:apply"));
};

function allLanguageItems() {
  return registry.map((l) => ({
    kind: "language",
    label: l.name.toLowerCase(),
    hint: l.short.toLowerCase(),
    hay: `${l.short} ${l.name} ${l.id}`.toLowerCase(),
    run: go(`#/index/${l.id}`)
  }));
}

function commands() {
  const out = [];
  const cmd = (label, run) => out.push({ kind: "command", label, hint: "", hay: label.toLowerCase(), run });
  for (const v of ["system", "light", "dark"]) cmd(`theme ${v}`, set("theme", v));
  for (const v of ["jetbrains", "plex", "geist", "fira"]) cmd(`font ${v}`, set("font", v));
  for (const n of [14, 16, 18, 20, 22, 24]) cmd(`font ${n}`, set("fontSize", n));
  cmd("settings", go("#/settings"));
  cmd("index", go("#/index"));
  cmd("stats", go("#/stats"));
  cmd("proof", go("#/proof/last"));
  for (const id of readyIds()) {
    cmd(`drill ${id}`, go(`#/drill/${id}`));
    for (const n of [30, 60, 120]) cmd(`sprint ${id} ${n}`, go(`#/sprint/${id}/${n}`));
  }
  return out;
}

const idents = (c) => {
  const seen = new Set();
  for (const e of c.examples) for (const w of e.code.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) || []) seen.add(w.toLowerCase());
  return [...seen].join(" ");
};

let lessonCache = null;

function lessons() {
  if (!lessonCache) {
    lessonCache = Promise.all(readyIds().map((id) => loadLanguage(id))).then((all) => {
      const out = [];
      for (const d of all) {
        if (!d) continue;
        const first = new Map();
        for (const p of plates(d)) if (!first.has(p.concept)) first.set(p.concept, p);
        for (const t of d.topics) {
          out.push({ kind: "topic", lang: d.id, label: t.title, hint: `${d.short} · ${pad(t.n)}`, hay: `${d.short} ${d.name} ${t.title}`.toLowerCase(), run: go(`#/index/${d.id}`) });
          for (const c of t.concepts) {
            const at = first.get(c);
            if (!at) continue;
            out.push({
              kind: "concept",
              lang: d.id,
              label: c.title,
              hint: `${d.short} · ${pad(t.n)} · ${pad(c.n)}`,
              hay: `${d.short} ${d.name} ${t.title} ${c.title}`.toLowerCase(),
              deep: `${c.gloss || ""} ${idents(c)}`.toLowerCase(),
              run: go(addressOf(at))
            });
          }
        }
      }
      return out;
    });
  }
  return lessonCache;
}

function currentLang() {
  const m = location.hash.match(/^#\/(?:t|index|drill|sprint|recall|stats)\/([a-z0-9]+)/);
  if (m && byId(m[1])) return m[1];
  const cur = store.state.cursor;
  return cur && cur.lang ? cur.lang : null;
}

function scoreTerm(term, hay) {
  const i = hay.indexOf(term);
  if (i >= 0) return 100 - Math.min(i, 50) + (i === 0 || hay[i - 1] === " " ? 20 : 0);
  let pos = 0;
  let gaps = 0;
  for (const ch of term) {
    const j = hay.indexOf(ch, pos);
    if (j < 0) return -1;
    gaps += j - pos;
    pos = j + 1;
  }
  return Math.max(1, 50 - gaps);
}

function scored(q, items, here = null) {
  const terms = q.split(/\s+/).filter(Boolean);
  return items
    .map((it) => {
      let total = here && it.lang === here ? 25 : 0;
      let strong = true;
      for (const t of terms) {
        let sc = scoreTerm(t, it.hay);
        const sub = it.hay.includes(t) || (it.deep && it.deep.includes(t));
        if (it.deep && it.deep.includes(t)) sc = Math.max(sc, 30);
        if (sc < 0) return null;
        if (!sub) strong = false;
        total += sc + (it.keys && it.keys.includes(t) ? 200 : 0);
      }
      return { it, total, strong };
    })
    .filter(Boolean)
    .sort((a, b) => b.total - a.total);
}

function rank(q, items, lim = 8, here = null) {
  if (!q) return items.slice(0, lim);
  return scored(q, items, here).map((x) => x.it);
}

const plainRow = (it, i, on) => `<li role="option" data-i="${i}" aria-selected="${on}" class="${on ? "sel" : ""}"><span class="pl">${esc(it.label)}</span><span class="ph2">${esc(it.hint)}</span><span class="pk">${it.kind}</span></li>`;

export async function togglePalette(mode = "all") {
  if (current) {
    const same = current.mode === mode;
    current.close();
    if (same) return;
  }
  const lang = mode === "lang";
  const prev = document.activeElement;
  const wrap = document.createElement("div");
  wrap.className = "pal-wrap";
  wrap.innerHTML = `<div class="pal${lang ? " langs" : ""}" role="dialog" aria-modal="true" aria-label="${lang ? "language" : "jump"}"><input class="pal-in" type="text" autocomplete="off" spellcheck="false" placeholder="${lang ? "language or lesson" : "jump to a language, topic or concept"}" aria-label="search"><ul class="pal-list" role="listbox"></ul>${lang ? '<p class="pal-ft"><span>↵ resume</span><span>⇧↵ contents</span><span>esc close</span></p>' : ""}</div>`;
  document.body.append(wrap);
  document.body.classList.add("pal");
  const input = wrap.querySelector("input");
  const ul = wrap.querySelector("ul");
  const near = currentLang();
  const langItems = lang ? languageItems() : allLanguageItems();
  const cmdItems = lang ? [] : commands();
  let loaded = [];
  let items = [];
  let shown = [];
  let sel = 0;

  const close = () => {
    wrap.remove();
    document.body.classList.remove("pal");
    current = null;
    if (prev && prev.focus) prev.focus();
  };
  current = { close, mode };

  const compose = () => (lang ? langItems : [...langItems, ...loaded, ...cmdItems]);

  function draw() {
    const q = input.value.trim().toLowerCase();
    const lim = lang ? Infinity : 8;
    let main = rank(q, items, lim, near).slice(0, lim);
    let more = [];
    if (lang && q) {
      const hits = scored(q, loaded.filter((x) => x.kind === "concept"), near).filter((x) => x.strong);
      if (hits.length) {
        more = hits.slice(0, 6).map((x) => x.it);
        main = scored(q, items, near).filter((x) => x.strong).map((x) => x.it);
      }
    }
    shown = main.concat(more);
    if (sel >= shown.length) sel = Math.max(0, shown.length - 1);
    ul.innerHTML = shown
      .map((it, i) => (more.length && main.length && i === main.length ? '<li class="pal-sep" role="presentation">lessons</li>' : "") + (it.id ? langRow(it, i, i === sel) : plainRow(it, i, i === sel)))
      .join("");
    const at = lang && ul.querySelector(`[data-i="${sel}"]`);
    if (at) at.scrollIntoView({ block: "nearest" });
  }

  function run(i, alt) {
    const it = shown[i];
    close();
    if (it) it.run(alt);
  }

  input.addEventListener("input", () => {
    sel = 0;
    draw();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % Math.max(shown.length, 1);
      draw();
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(sel, e.shiftKey);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
    } else if (e.key === "Tab") e.preventDefault();
  });
  ul.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li && li.dataset.i !== undefined) run(Number(li.dataset.i), e.shiftKey);
  });
  wrap.addEventListener("mousedown", (e) => {
    if (e.target === wrap) close();
  });

  input.focus();
  items = compose();
  if (lang) sel = Math.max(0, items.findIndex((it) => !it.here));
  draw();
  if (lang) fillProgress(wrap, ul);
  loaded = await lessons().catch(() => []);
  if (current && current.close === close) {
    items = compose();
    draw();
  }
}
