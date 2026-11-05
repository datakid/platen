import { store } from "../store.js";
import { esc } from "../util.js";

const onOff = [["on", true], ["off", false]];
const sizes = Array.from({ length: 11 }, (_, i) => [String(14 + i), 14 + i]);

const ROWS = [
  { k: "theme", l: "theme", o: [["system", "system"], ["light", "light"], ["dark", "dark"]] },
  { k: "font", l: "code font", o: [["jetbrains", "jetbrains"], ["plex", "plex"], ["geist", "geist"], ["fira", "fira"]] },
  { k: "fontSize", l: "font size", o: sizes },
  { k: "caret", l: "caret", o: [["bar", "bar"], ["block", "block"], ["underline", "underline"]] },
  { k: "smooth", l: "smooth caret", o: onOff },
  { k: "errorMode", l: "error mode", o: [["flow", "flow"], ["strict", "strict"]] },
  { k: "autoIndent", l: "auto-indent skip", o: onOff },
  { k: "comments", l: "comments", o: [["skip", "skip"], ["type", "type"]] },
  { k: "notes", l: "notes", o: [["always", "always"], ["after finish", "finish"], ["off", "off"]] },
  { k: "liveStats", l: "live stats", o: onOff },
  { k: "tape", l: "tape", o: onOff },
  { k: "whitespace", l: "whitespace marks", o: onOff },
  { k: "focus", l: "focus mode", o: onOff },
  { k: "sound", l: "sound", o: [["off", "off"], ["soft click", "click"]] }
];

const apply = () => document.dispatchEvent(new CustomEvent("platen:apply"));

export function mount(root, r, ctx) {
  let pending = null;
  let resetting = false;
  let status = "";
  let focusKey = null;

  const label = (row) => {
    const v = store.state.settings[row.k];
    const hit = row.o.find(([, x]) => x === v) || row.o[0];
    return hit[0];
  };

  function render() {
    const rows = ROWS.map(
      (row) => `<button type="button" class="srow" data-k="${row.k}"><span class="l">${row.l}</span><i></i><span class="v">${esc(label(row))}</span></button>`
    ).join("");
    let data = `<button type="button" class="srow" data-d="export"><span class="l">data</span><i></i><span class="v">export json</span></button>`;
    if (pending) {
      data += `<div class="srow static"><span class="l">import json</span><i></i><span class="v">merge ${pending.plates} plates and ${pending.sessions} sessions? <button type="button" data-d="merge">enter merge</button> <button type="button" data-d="cancel">esc cancel</button></span></div>`;
    } else {
      data += `<button type="button" class="srow" data-d="import"><span class="l"></span><i></i><span class="v">import json</span></button>`;
    }
    if (resetting) {
      data += `<div class="srow static"><span class="l">reset</span><i></i><span class="v"><input class="rin" type="text" autocomplete="off" spellcheck="false" placeholder="type reset to confirm" aria-label="type reset to confirm"></span></div>`;
    } else {
      data += `<button type="button" class="srow" data-d="reset"><span class="l"></span><i></i><span class="v">reset</span></button>`;
    }
    root.innerHTML = `<div class="set">${rows}<div class="sg">${data}</div><p class="sn">${esc(status)}</p></div>`;
    if (resetting) root.querySelector(".rin").focus();
    else if (focusKey) {
      const el = root.querySelector(`[data-k="${focusKey}"],[data-d="${focusKey}"]`);
      if (el) el.focus();
    }
  }

  function cycle(k, d) {
    const row = ROWS.find((x) => x.k === k);
    const cur = store.state.settings[k];
    const i = Math.max(0, row.o.findIndex(([, v]) => v === cur));
    const next = row.o[(i + d + row.o.length) % row.o.length][1];
    store.update((s) => {
      s.settings[k] = next;
    });
    apply();
    focusKey = k;
    render();
  }

  function pickFile() {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "application/json,.json";
    inp.onchange = async () => {
      const f = inp.files[0];
      if (!f) return;
      let res;
      try {
        res = store.inspect(JSON.parse(await f.text()));
      } catch {
        res = { ok: false, error: "not valid json" };
      }
      if (res.ok) {
        pending = res;
        status = "";
      } else status = res.error;
      focusKey = null;
      render();
    };
    inp.click();
  }

  function exportJson() {
    const blob = new Blob([store.exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `platen-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    status = "exported";
    focusKey = "export";
    render();
  }

  const onClick = (e) => {
    const row = e.target.closest("[data-k]");
    if (row) {
      cycle(row.dataset.k, 1);
      return;
    }
    const d = e.target.closest("[data-d]");
    if (!d) return;
    const a = d.dataset.d;
    if (a === "export") exportJson();
    else if (a === "import") pickFile();
    else if (a === "merge") {
      store.merge(pending.data);
      status = `merged ${pending.plates} plates and ${pending.sessions} sessions`;
      pending = null;
      focusKey = "import";
      render();
    } else if (a === "cancel") {
      pending = null;
      focusKey = "import";
      render();
    } else if (a === "reset") {
      resetting = true;
      status = "";
      render();
    }
  };

  const onKey = (e) => {
    if (e.target.classList && e.target.classList.contains("rin")) {
      if (e.key === "Enter" && e.target.value.trim() === "reset") {
        store.reset();
        apply();
        resetting = false;
        status = "data cleared";
        focusKey = null;
        render();
      } else if (e.key === "Escape") {
        resetting = false;
        focusKey = "reset";
        render();
      }
      return;
    }
    const row = e.target.closest && e.target.closest("[data-k]");
    if (row && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      cycle(row.dataset.k, e.key === "ArrowRight" ? 1 : -1);
    } else if (pending && e.key === "Enter" && !e.target.closest("button")) {
      store.merge(pending.data);
      status = `merged ${pending.plates} plates and ${pending.sessions} sessions`;
      pending = null;
      render();
    } else if (pending && e.key === "Escape") {
      pending = null;
      render();
    }
  };

  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKey);
  render();
  return () => {
    root.removeEventListener("click", onClick);
    root.removeEventListener("keydown", onKey);
  };
}
