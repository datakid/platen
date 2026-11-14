import vm from "node:vm";
const d = (await import("../data/languages/regex.js")).default;
let n = 0, bad = 0;
const fail = (id, msg) => { bad++; console.log(id, "|", msg); };
for (const t of d.topics) for (const c of t.concepts) for (const [i, e] of c.examples.entries()) {
  n++;
  const id = `${t.id}/${c.id}/${i}`;
  const code = e.code;
  try {
    const lit = /^\/(.*)\/([a-z]*)$/s.exec(code);
    if (lit) {
      new RegExp(lit[1], lit[2]);
    } else if (/^(const|let|for)\b/.test(code)) {
      vm.runInNewContext(code, { console: { log() {} } });
    } else {
      try {
        new RegExp(code);
      } catch (err) {
        new RegExp(code, "u");
      }
    }
  } catch (err) {
    fail(id, String(err.message).slice(0, 140));
  }
}
console.log(`regex: ${n} snippets, ${bad} failed`);
