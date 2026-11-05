const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const TRAPS = {
  pandas: [
    [/\b(?:df|frame|data)\w*\.append\(/, "DataFrame.append was removed, use pd.concat"],
    [/\.ix\[/, "ix was removed"],
    [/\.iteritems\(/, "iteritems was removed"]
  ],
  polars: [
    [/\.groupby\(/, "use group_by"],
    [/\.melt\(/, "use unpivot"],
    [/\.with_column\(/, "use with_columns"]
  ],
  numpy: [
    [/np\.random\.seed/, "use np.random.default_rng()"],
    [/np\.float_\b|np\.int_\b|np\.bool8|np\.object0/, "removed in NumPy 2"],
    [/np\.row_stack|np\.in1d|np\.trapz/, "deprecated in NumPy 2"]
  ],
  sklearn: [
    [/sparse=/, "use sparse_output"],
    [/load_boston/, "removed"]
  ],
  pytorch: [[/Variable\(/, "Variable is obsolete"]]
};

export function validateLanguage(data, meta, lexers) {
  const out = [];
  const bad = (where, msg) => out.push({ where, msg });
  const top = data.id || "?";
  for (const k of ["id", "name", "short", "pigment", "version", "lexer", "indent", "topics"]) {
    if (data[k] === undefined) bad(top, `missing ${k}`);
  }
  if (meta) {
    if (data.id !== meta.id) bad(top, `id differs from registry (${meta.id})`);
    if (data.short !== meta.short) bad(top, `short differs from registry (${meta.short})`);
    if (data.pigment !== meta.pigment) bad(top, `pigment differs from registry (${meta.pigment})`);
    if ((data.family || null) !== (meta.family || null)) bad(top, "family differs from registry");
    if (data.version !== meta.version) bad(top, `version differs from registry (${meta.version})`);
    if (data.topics && data.topics.length !== meta.topics) bad(top, `${data.topics.length} topics, registry says ${meta.topics}`);
  }
  if (lexers && !lexers[data.lexer]) bad(top, `no lexer named ${data.lexer}`);
  const topicIds = new Set();
  const plateIds = new Set();
  (data.topics || []).forEach((t, ti) => {
    const tw = `${top}/${t.id}`;
    if (!KEBAB.test(t.id || "")) bad(tw, "topic id is not kebab-case");
    if (topicIds.has(t.id)) bad(tw, "duplicate topic id");
    topicIds.add(t.id);
    if (t.n !== ti + 1) bad(tw, `topic n is ${t.n}, expected ${ti + 1}`);
    if (!t.title) bad(tw, "empty topic title");
    if (!t.concepts || t.concepts.length < 3) bad(tw, "fewer than 3 concepts");
    const conceptIds = new Set();
    (t.concepts || []).forEach((c, ci) => {
      const cw = `${tw}/${c.id}`;
      if (!KEBAB.test(c.id || "")) bad(cw, "concept id is not kebab-case");
      if (conceptIds.has(c.id)) bad(cw, "duplicate concept id");
      conceptIds.add(c.id);
      if (c.n !== ci + 1) bad(cw, `concept n is ${c.n}, expected ${ci + 1}`);
      if (!c.title) bad(cw, "empty concept title");
      if (![1, 2, 3].includes(c.level)) bad(cw, "level must be 1, 2 or 3");
      const g = c.gloss || "";
      if (!g.trim()) bad(cw, "empty gloss");
      else {
        if (g.length > 90) bad(cw, `gloss is ${g.length} chars`);
        if (!g.endsWith(".")) bad(cw, "gloss does not end with a period");
        if (g.slice(0, -1).includes(". ")) bad(cw, "gloss is more than one sentence");
        if (/!|^this\b/i.test(g)) bad(cw, "gloss has an exclamation mark or starts with this");
        if (!/^[A-Z][a-z]+s\s/.test(g)) bad(cw, "gloss should start with a present-tense verb");
      }
      const ex = c.examples || [];
      if (ex.length < 3 || ex.length > 4) bad(cw, `${ex.length} examples, expected 3 or 4`);
      const seenCode = new Set();
      ex.forEach((e, vi) => {
        const id = `${data.id}/${t.id}/${c.id}/${vi}`;
        const w = `${cw}/${String.fromCharCode(97 + vi)}`;
        if (plateIds.has(id)) bad(w, "duplicate plate id");
        plateIds.add(id);
        const code = e.code || "";
        if (!code.trim()) bad(w, "empty code");
        if (seenCode.has(code)) bad(w, "same code as another variant");
        seenCode.add(code);
        const lines = code.split("\n");
        if (lines.length > 12) bad(w, `${lines.length} lines`);
        lines.forEach((l, i) => {
          if (l.length > 72) bad(w, `line ${i + 1} is ${l.length} columns`);
          if (/\s+$/.test(l)) bad(w, `line ${i + 1} has trailing whitespace`);
          if (l.includes("\t")) bad(w, `line ${i + 1} has a tab`);
        });
        if (lines[0].trim() === "" || lines[lines.length - 1].trim() === "") bad(w, "blank line at start or end");
        if (lines.filter((l) => l.trim() === "").length > 1) bad(w, "more than one blank line");
        if (/\b(foo|bar|baz)\b/.test(code)) bad(w, "uses foo, bar or baz");
        for (const [re, why] of TRAPS[data.id] || []) if (re.test(code)) bad(w, why);
        const notes = e.notes || [];
        if (notes.length > 3) bad(w, "more than 3 notes");
        notes.forEach((n) => {
          let at = -1;
          let from = 0;
          for (let q = 0; q <= (n.nth || 0); q++) {
            at = code.indexOf(n.at, from);
            if (at < 0) break;
            from = at + 1;
          }
          if (at < 0) bad(w, `note anchor not found: ${n.at}`);
          const tx = n.text || "";
          if (!tx) bad(w, "empty note");
          if (tx.length > 40) bad(w, `note is ${tx.length} chars: ${tx}`);
          if (/^[A-Z]/.test(tx) || tx.endsWith(".") || tx.includes("!")) bad(w, `note should be a lowercase fragment: ${tx}`);
        });
      });
    });
  });
  return out;
}
