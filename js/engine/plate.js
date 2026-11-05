import { tokenize } from "./lexer.js";

export function normalize(code, indent) {
  return code
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, " ".repeat(indent))
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/^\n+|\n+$/g, "");
}

export function buildCells(code, def, opts) {
  const { cls, tok, cluster } = tokenize(code, def);
  const cells = [];
  const lines = [{ start: 0, end: 0 }];
  let line = 0;
  let col = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    cells.push({ ch, line, col, cls: cls[i], tok: tok[i], cluster: cluster[i], skip: false, lead: false, noteIdx: null, state: "pending", wasErr: false });
    if (ch === "\n") {
      lines[line].end = i;
      line++;
      col = 0;
      lines.push({ start: i + 1, end: i + 1 });
    } else col++;
  }
  lines[line].end = code.length;

  if (opts.autoIndent) {
    for (const L of lines) {
      for (let k = L.start; k < L.end && cells[k].cls === "ws"; k++) {
        cells[k].skip = true;
        cells[k].lead = true;
      }
    }
  }
  if (opts.comments === "skip") {
    for (const c of cells) if (c.cls === "comment") c.skip = true;
    for (const L of lines) {
      let k = L.start;
      while (k < L.end && cells[k].cls !== "comment") k++;
      if (k < L.end) {
        for (let j = k - 1; j >= L.start && cells[j].cls === "ws"; j--) cells[j].skip = true;
      }
    }
  }
  for (const L of lines) {
    if (L.end > L.start && L.end < cells.length) {
      let all = true;
      for (let k = L.start; k < L.end; k++) {
        if (!cells[k].skip) {
          all = false;
          break;
        }
      }
      if (all) cells[L.end].skip = true;
    }
  }
  let k = cells.length - 1;
  for (;;) {
    while (k >= 0 && cells[k].skip) k--;
    if (k >= 0 && cells[k].cls === "nl") {
      cells[k].skip = true;
      k--;
    } else break;
  }

  const notes = (opts.notes || []).map((n) => {
    let at = -1;
    let from = 0;
    for (let q = 0; q <= (n.nth || 0); q++) {
      at = code.indexOf(n.at, from);
      if (at < 0) break;
      from = at + 1;
    }
    return { ...n, start: at, end: at < 0 ? -1 : at + n.at.length };
  });
  notes.forEach((n, idx) => {
    if (n.start >= 0) for (let q = n.start; q < n.end; q++) cells[q].noteIdx = idx;
  });
  return { cells, lines, notes };
}

export class Plate {
  constructor(example, def, opts) {
    this.indent = opts.indent || 4;
    this.code = normalize(example.code, this.indent);
    const b = buildCells(this.code, def, { ...opts, notes: example.notes });
    this.cells = b.cells;
    this.lines = b.lines;
    this.notes = b.notes;
    this.strict = opts.errorMode === "strict";
    this.reset();
  }

  reset() {
    for (const c of this.cells) {
      c.state = c.skip ? "skip" : "pending";
      c.wasErr = false;
    }
    this.log = [];
    this.t0 = 0;
    this.tEnd = 0;
    this.done = false;
    this.pos = this.nextFree(0);
    if (this.pos >= this.cells.length) this.done = true;
  }

  nextFree(i) {
    while (i < this.cells.length && this.cells[i].skip) i++;
    return i;
  }

  prevFree(i) {
    i--;
    while (i >= 0 && this.cells[i].skip) i--;
    return i;
  }

  type(got, t) {
    if (this.done) return null;
    if (!this.t0) this.t0 = t;
    const i = this.pos;
    const c = this.cells[i];
    const ok = got === c.ch;
    this.log.push({ t, pos: i, expected: c.ch, got, ok });
    if (!ok && (this.strict || c.cls === "nl")) return { changed: [], rejected: i };
    if (ok) c.state = c.wasErr ? "fixed" : "ok";
    else {
      c.state = "err";
      c.wasErr = true;
    }
    this.pos = this.nextFree(i + 1);
    if (this.pos >= this.cells.length) {
      this.done = true;
      this.tEnd = t;
      this.pos = this.cells.length;
    }
    return { changed: [i] };
  }

  backspace(t) {
    if (this.done) return null;
    const p = this.prevFree(this.pos);
    if (p < 0) return null;
    const c = this.cells[p];
    if (c.state === "err") c.wasErr = true;
    c.state = "pending";
    this.pos = p;
    this.log.push({ t, pos: p, bs: true });
    return { changed: [p] };
  }

  backspaceWord(t) {
    const r = this.backspace(t);
    if (!r) return null;
    const changed = [...r.changed];
    const tok = this.cells[this.pos].tok;
    for (;;) {
      const p = this.prevFree(this.pos);
      if (p < 0) break;
      const c = this.cells[p];
      if (c.tok !== tok || c.cls === "nl") break;
      changed.push(...this.backspace(t).changed);
    }
    return { changed };
  }
}
