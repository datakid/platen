const KEY = "platen:v1";
const CURRENT = 1;
const migrations = {};

const defaults = () => ({
  v: CURRENT,
  settings: {
    theme: "system",
    font: "jetbrains",
    fontSize: 18,
    caret: "bar",
    smooth: true,
    errorMode: "flow",
    autoIndent: true,
    comments: "skip",
    notes: "always",
    liveStats: true,
    tape: true,
    whitespace: true,
    focus: true,
    sound: "off"
  },
  cursor: null,
  where: {},
  last: null,
  plates: {},
  units: {},
  sessions: []
});

function migrate(s) {
  const d = defaults();
  if (!s || typeof s !== "object") return d;
  while ((s.v || 0) < CURRENT) {
    const m = migrations[s.v || 0];
    if (!m) break;
    s = m(s);
  }
  return { ...d, ...s, v: s.v > CURRENT ? s.v : CURRENT, settings: { ...d.settings, ...s.settings } };
}

function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return defaults();
  }
  if (raw == null) return defaults();
  try {
    return migrate(JSON.parse(raw));
  } catch {
    try {
      localStorage.setItem(KEY + ":corrupt", raw);
    } catch {}
    return defaults();
  }
}

let timer = 0;

function write() {
  clearTimeout(timer);
  timer = 0;
  try {
    localStorage.setItem(KEY, JSON.stringify(store.state));
  } catch {}
}

export const store = {
  state: load(),
  update(fn) {
    fn(this.state);
    this.queue();
  },
  queue() {
    if (!timer) timer = setTimeout(write, 500);
  },
  flush() {
    if (timer) write();
  },
  reset() {
    this.state = defaults();
    write();
  },
  exportJson() {
    return JSON.stringify(this.state, null, 2);
  },
  inspect(obj) {
    if (!obj || typeof obj !== "object" || typeof obj.v !== "number") return { ok: false, error: "not a platen export" };
    if (obj.v > CURRENT) return { ok: false, error: "made by a newer version" };
    const m = migrate(obj);
    const cur = this.state;
    const plates = Object.keys(m.plates).filter((k) => !cur.plates[k] || cur.plates[k].lastAt < m.plates[k].lastAt).length;
    const have = new Set(cur.sessions.map((x) => x.at));
    const sessions = m.sessions.filter((x) => !have.has(x.at)).length;
    return { ok: true, plates, sessions, data: m };
  },
  merge(m) {
    this.update((s) => {
      for (const [k, r] of Object.entries(m.plates)) {
        const o = s.plates[k];
        if (!o) {
          s.plates[k] = r;
          continue;
        }
        s.plates[k] = {
          runs: Math.max(o.runs, r.runs),
          bestWpm: Math.max(o.bestWpm, r.bestWpm),
          bestAcc: Math.max(o.bestAcc, r.bestAcc),
          lastAt: Math.max(o.lastAt, r.lastAt),
          accHistory: r.lastAt > o.lastAt ? r.accHistory : o.accHistory
        };
      }
      const have = new Set(s.sessions.map((x) => x.at));
      s.sessions = [...s.sessions, ...m.sessions.filter((x) => !have.has(x.at))].sort((a, b) => a.at - b.at).slice(-500);
      for (const [lang, u] of Object.entries(m.units || {})) {
        const t = s.units[lang] || (s.units[lang] = {});
        for (const [k, v] of Object.entries(u)) if (!t[k] || t[k].n < v.n) t[k] = v;
      }
    });
    write();
  }
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") store.flush();
});
addEventListener("pagehide", () => store.flush());
