const NUMBER = /(?:0[xXoObB][0-9a-fA-F_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d+)?)[jJ]?/y;
const DIRECTIVE = /#[ \t]*[A-Za-z_]+/y;
const IDENT = /[\p{L}_][\p{L}\p{N}_]*/uy;

export function tokenize(code, def) {
  const n = code.length;
  const cls = new Array(n);
  const tok = new Array(n);
  const cluster = new Array(n).fill(null);
  const keywords = new Set(def.keywords || []);
  const soft = new Set(def.softKeywords || []);
  const clusters = [...(def.clusters || [])].sort((a, b) => b.length - a.length);
  let t = 0;

  const one = (a, b, c) => {
    for (let k = a; k < b; k++) {
      cls[k] = c;
      tok[k] = t;
    }
    t++;
  };

  const run = (a, b, c) => {
    let last = null;
    for (let k = a; k < b; k++) {
      const ch = code[k];
      if (ch === "\n") {
        cls[k] = "nl";
        tok[k] = t++;
        last = null;
        continue;
      }
      const kind = ch === " " ? 1 : 2;
      if (kind !== last) {
        t++;
        last = kind;
      }
      cls[k] = c;
      tok[k] = t;
    }
    t++;
  };

  const stringEnd = (i) => {
    const st = def.strings;
    if (!st) return 0;
    let j = i;
    while (j < n && j - i < 2 && /[A-Za-z]/.test(code[j])) j++;
    const pre = code.slice(i, j);
    if (pre && !st.prefix.test(pre)) return 0;
    const q = st.quotes.find((x) => code.startsWith(x, j));
    if (!q) return 0;
    const raw = /[rR]/.test(pre) || Boolean(st.rawQuotes && st.rawQuotes.includes(q));
    let k = j + q.length;
    while (k < n) {
      if (!raw && code[k] === "\\") k += 2;
      else if (code.startsWith(q, k)) return k + q.length;
      else if (q.length === 1 && !raw && code[k] === "\n") return k;
      else k++;
    }
    return n;
  };

  const softHit = (w, i) => {
    const a = code.lastIndexOf("\n", i - 1) + 1;
    let b = code.indexOf("\n", i);
    if (b < 0) b = n;
    if (code.slice(a, i).trim() !== "") return false;
    const rest = code.slice(i + w.length, b);
    if (!/^\s+\S/.test(rest)) return false;
    if (w === "type") return /^\s+[\p{L}_]/u.test(rest) && rest.includes("=");
    return code.slice(a, b).trimEnd().endsWith(":");
  };

  let i = 0;
  while (i < n) {
    const ch = code[i];
    if (ch === "\n") {
      cls[i] = "nl";
      tok[i] = t++;
      i++;
      continue;
    }
    if (ch === " " || ch === "\t") {
      let j = i;
      while (j < n && (code[j] === " " || code[j] === "\t")) j++;
      one(i, j, "ws");
      i = j;
      continue;
    }
    if (def.blockComment && code.startsWith(def.blockComment[0], i)) {
      const close = code.indexOf(def.blockComment[1], i + def.blockComment[0].length);
      const j = close < 0 ? n : close + def.blockComment[1].length;
      run(i, j, "comment");
      i = j;
      continue;
    }
    if (def.lineComment && code.startsWith(def.lineComment, i)) {
      let j = code.indexOf("\n", i);
      if (j < 0) j = n;
      run(i, j, "comment");
      i = j;
      continue;
    }
    const se = stringEnd(i);
    if (se) {
      run(i, se, "string");
      i = se;
      continue;
    }
    if (def.directives && ch === "#" && code.slice(code.lastIndexOf("\n", i - 1) + 1, i).trim() === "") {
      DIRECTIVE.lastIndex = i;
      const dm = DIRECTIVE.exec(code);
      if (dm) {
        one(i, i + dm[0].length, "keyword");
        i += dm[0].length;
        if (/include$/.test(dm[0])) {
          let j = i;
          while (code[j] === " ") j++;
          if (code[j] === "<") {
            const close = code.indexOf(">", j);
            const e = close < 0 ? n : close + 1;
            if (j > i) one(i, j, "ws");
            run(j, e, "string");
            i = e;
          }
        }
        continue;
      }
    }
    const NUM = def.numberRe || NUMBER;
    NUM.lastIndex = i;
    const nm = NUM.exec(code);
    if (nm && nm[0]) {
      one(i, i + nm[0].length, "number");
      i += nm[0].length;
      continue;
    }
    IDENT.lastIndex = i;
    const im = IDENT.exec(code);
    if (im) {
      const w = im[0];
      one(i, i + w.length, keywords.has(w) || (soft.has(w) && softHit(w, i)) ? "keyword" : "ident");
      i += im[0].length;
      continue;
    }
    const cl = clusters.find((c) => code.startsWith(c, i));
    if (cl) {
      for (let k = i; k < i + cl.length; k++) {
        cls[k] = "punct";
        tok[k] = t;
        cluster[k] = cl;
      }
      t++;
      i += cl.length;
      continue;
    }
    one(i, i + 1, "punct");
    i++;
  }
  return { cls, tok, cluster };
}
