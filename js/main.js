import { store } from "./store.js";
import { byId, loadLanguage, plates, addressOf } from "./content/registry.js";
import * as typing from "./ui/typing.js";
import * as indexView from "./ui/index.js";
import * as statsView from "./ui/stats.js";
import * as settingsView from "./ui/settings.js";
import * as proofView from "./ui/proof.js";
import { togglePalette } from "./ui/palette.js";
import { esc } from "./util.js";

const view = document.getElementById("view");
const crumbEl = document.getElementById("crumb");
const modesEl = document.getElementById("modes");
const navEl = document.getElementById("nav");
const themeBtn = document.getElementById("theme");
const themeLabel = document.getElementById("tl");

const FONTS = {
  jetbrains: { stack: '"JetBrains Mono"', link: null },
  plex: { stack: '"IBM Plex Mono"', link: "family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400" },
  geist: { stack: '"Geist Mono"', link: "family=Geist+Mono:wght@400;500" },
  fira: { stack: '"Fira Code"', link: "family=Fira+Code:wght@400;500" }
};
const loadedFonts = new Set();

function ensureFont(key) {
  const f = FONTS[key];
  if (!f || !f.link || loadedFonts.has(key)) return;
  loadedFonts.add(key);
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = `https://fonts.googleapis.com/css2?${f.link}&display=swap`;
  document.head.append(l);
}

function applySettings() {
  const s = store.state.settings;
  const root = document.documentElement;
  if (s.theme === "system") delete root.dataset.theme;
  else root.dataset.theme = s.theme;
  const f = FONTS[s.font] || FONTS.jetbrains;
  ensureFont(s.font);
  root.style.setProperty("--code-font", `${f.stack}, ui-monospace, Menlo, monospace`);
  root.style.setProperty("--code-size", `${s.fontSize}px`);
  document.body.dataset.caret = s.caret;
  document.body.dataset.smooth = s.smooth ? "on" : "off";
  document.body.dataset.ws = s.whitespace ? "on" : "off";
  document.dispatchEvent(new CustomEvent("platen:settings"));
}

let labelT = 0;
themeBtn.addEventListener("click", () => {
  const order = ["system", "light", "dark"];
  const cur = store.state.settings.theme;
  const next = order[(order.indexOf(cur) + 1) % order.length];
  store.update((s) => {
    s.settings.theme = next;
  });
  applySettings();
  themeLabel.textContent = next === "system" ? "sys" : next;
  clearTimeout(labelT);
  labelT = setTimeout(() => {
    themeLabel.textContent = "";
  }, 1000);
});

document.addEventListener("platen:apply", applySettings);

document.addEventListener("keydown", (e) => {
  if (!(e.ctrlKey || e.metaKey)) return;
  if (e.key === ",") {
    e.preventDefault();
    location.hash = "#/settings";
  } else if (e.key.toLowerCase() === "k") {
    e.preventDefault();
    togglePalette();
  }
});

const ctx = {
  crumb(items) {
    crumbEl.innerHTML = items
      .map((i) => (i.href ? `<a href="${i.href}">${esc(i.t)}</a>` : `<span>${esc(i.t)}</span>`))
      .join("<i>/</i>");
  }
};

const stub = {
  mount(root) {
    root.innerHTML = '<p class="empty">not built yet</p>';
    return () => {};
  }
};

function setModes(lang, active) {
  if (!lang || !byId(lang)) {
    modesEl.innerHTML = "";
    return;
  }
  const cur = store.state.cursor;
  const same = cur && cur.lang === lang;
  const items = [
    ["blocks", same ? `#/t/${lang}/${cur.topic}/${cur.concept}/${cur.variant}` : `#/index/${lang}`],
    ["drill", `#/drill/${lang}`],
    ["sprint", `#/sprint/${lang}/60`],
    ["recall", same ? `#/recall/${lang}/${cur.topic}/${cur.concept}` : `#/index/${lang}`]
  ];
  modesEl.innerHTML = items.map(([n, h]) => `<a href="${h}"${n === active ? ' class="on"' : ""}>${n}</a>`).join("");
}

function setNav(active) {
  navEl.innerHTML = ["index", "stats"].map((n) => `<a href="#/${n}"${n === active ? ' class="on"' : ""}>${n}</a>`).join("");
}

async function home() {
  const cur = store.state.cursor;
  if (cur && byId(cur.lang)) {
    location.replace(`#/t/${cur.lang}/${cur.topic}/${cur.concept}/${cur.variant}`);
    return;
  }
  const d = await loadLanguage("python");
  const first = d && plates(d)[0];
  if (first) location.replace(addressOf(first));
  else view.innerHTML = '<p class="empty">no data yet</p>';
}

let seq = 0;
let cleanup = null;

async function render() {
  const my = ++seq;
  if (cleanup) {
    cleanup();
    cleanup = null;
  }
  document.body.classList.remove("typing");
  delete document.body.dataset.pg;
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const [h, a, b, c, d] = parts;
  document.body.dataset.view = h || "home";
  if (!h) {
    await home();
    return;
  }

  const lang = ["t", "drill", "sprint", "recall"].includes(h) ? a : h === "index" || h === "stats" ? a : null;
  const meta = lang ? byId(lang) : null;
  if (meta) document.body.dataset.pg = meta.pigment;

  let mod = null;
  let args = {};
  let active = null;
  let crumb = [];
  let navActive = null;

  if (h === "t") {
    mod = typing;
    args = { lang: a, topic: b, concept: c, variant: d };
    active = "blocks";
  } else if (h === "drill" || h === "sprint" || h === "recall") {
    mod = stub;
    active = h;
    crumb = [{ t: meta ? meta.name.toLowerCase() : h, href: meta ? `#/index/${meta.id}` : null }, { t: h }];
  } else if (h === "proof") {
    mod = proofView;
    crumb = [{ t: "proof" }];
  } else if (h === "index") {
    mod = indexView;
    args = { lang: a };
    navActive = "index";
    crumb = [{ t: "index" }];
  } else if (h === "stats") {
    mod = statsView;
    navActive = "stats";
    crumb = [{ t: "stats" }];
  } else if (h === "settings") {
    mod = settingsView;
    crumb = [{ t: "settings" }];
  } else {
    location.replace("#/");
    return;
  }

  ctx.crumb(crumb);
  setModes(["t", "drill", "sprint", "recall"].includes(h) ? lang : null, active);
  setNav(navActive);
  window.scrollTo(0, 0);
  const result = await mod.mount(view, args, ctx);
  if (my !== seq) {
    if (result) result();
    return;
  }
  cleanup = result;
  setModes(["t", "drill", "sprint", "recall"].includes(h) ? lang : null, active);
}

applySettings();
addEventListener("hashchange", render);
render();
