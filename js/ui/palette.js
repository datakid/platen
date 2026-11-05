import { registry, loadLanguage, plates, addressOf, readyIds } from "../content/registry.js";
import { store } from "../store.js";
import { esc, pad } from "../util.js";

let current = null;

const go = (h) => () => {
  location.hash = h;
};
const set = (k, v) => () => {
  store.update((s) => {
    s.settings[k] = v;
  });
  document.dispatchEvent(new CustomEvent("platen:apply"));
};

async function build() {
  const out = [];
  for (const l of registry) {
    out.push({ kind: "language", label: l.name.toLowerCase(), hint: l.short.toLowerCase(), hay: `${l.short} ${l.name} ${l.id}`.toLowerCase(), run: go(`#/index/${l.id}`) });
  }
  for (const id of readyIds()) {
    const d = await loadLanguage(id);
    if (!d) continue;
    for (const t of d.topics) {
      out.push({ kind: "topic", label: t.title, hint: `${d.short} · ${pad(t.n)}`, hay: `${d.short} ${d.name} ${t.title}`.toLowerCase(), run: go(`#/index/${id}`) });
      for (const c of t.concepts) {
        const first = plates(d).find((x) => x.concept === c);
        out.push({
          kind: "concept",
          label: c.title,
          hint: `${d.short} · ${pad(t.n)} · ${pad(c.n)}`,
          hay: `${d.short} ${d.name} ${t.title} ${c.title}`.toLowerCase(),
          run: go(addressOf(first))
        });
      }
    }
  }
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

function rank(q, items) {
  if (!q) return items.slice(0, 8);
  const terms = q.split(/\s+/).filter(Boolean);
  return items
    .map((it) => {
      let total = 0;
      for (const t of terms) {
        const sc = scoreTerm(t, it.hay);
        if (sc < 0) return null;
        total += sc;
      }
      return { it, total };
    })
    .filter(Boolean)
    .sort((a, b) => b.total - a.total)
    .map((x) => x.it);
}

export async function togglePalette() {
  if (current) {
    current.close();
    return;
  }
  const prev = document.activeElement;
  const wrap = document.createElement("div");
  wrap.className = "pal-wrap";
  wrap.innerHTML = `<div class="pal" role="dialog" aria-modal="true" aria-label="jump"><input class="pal-in" type="text" autocomplete="off" spellcheck="false" placeholder="jump to a language, topic or concept" aria-label="search"><ul class="pal-list" role="listbox"></ul></div>`;
  document.body.append(wrap);
  document.body.classList.add("pal");
  const input = wrap.querySelector("input");
  const ul = wrap.querySelector("ul");
  let items = [];
  let shown = [];
  let sel = 0;

  const close = () => {
    wrap.remove();
    document.body.classList.remove("pal");
    current = null;
    if (prev && prev.focus) prev.focus();
  };
  current = { close };

  function draw() {
    shown = rank(input.value.trim().toLowerCase(), items).slice(0, 8);
    if (sel >= shown.length) sel = Math.max(0, shown.length - 1);
    ul.innerHTML = shown
      .map((it, i) => `<li role="option" data-i="${i}" aria-selected="${i === sel}" class="${i === sel ? "sel" : ""}"><span class="pl">${esc(it.label)}</span><span class="ph2">${esc(it.hint)}</span><span class="pk">${it.kind}</span></li>`)
      .join("");
  }

  function run(i) {
    const it = shown[i];
    close();
    if (it) it.run();
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
      run(sel);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
    } else if (e.key === "Tab") e.preventDefault();
  });
  ul.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) run(Number(li.dataset.i));
  });
  wrap.addEventListener("mousedown", (e) => {
    if (e.target === wrap) close();
  });

  input.focus();
  items = await build();
  if (current) draw();
}
