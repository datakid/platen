import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const dir = resolve(process.env.TAILWIND_DIR || ".");
const tw = await import(pathToFileURL(createRequire(join(dir, "x.js")).resolve("tailwindcss")).href);
const compile = tw.compile ?? tw.default.compile;
const base = join(dir, "node_modules", "tailwindcss");
const loadStylesheet = async (id, b) => {
  if (id === "tailwindcss") return { path: base + "/index.css", base, content: readFileSync(base + "/index.css", "utf8") };
  throw new Error("cannot load " + id);
};
const d = (await import("../data/languages/tailwind.js")).default;
const marker = new Set(["group", "peer", "dark"]);
let n = 0, bad = 0;
const mk = async (css) => compile(css, { base, loadStylesheet });
const plain = await mk('@import "tailwindcss";');
let prev = plain.build([]);
const validSeen = new Set();
const probe = (cl) => { if (validSeen.has(cl)) return true; const out = plain.build([cl]); const ok = out !== prev; prev = out; if (ok) validSeen.add(cl); return ok; };
for (const t of d.topics) for (const c of t.concepts) for (const [i, e] of c.examples.entries()) {
  n++;
  const id = `${t.id}/${c.id}/${i}`;
  const code = e.code;
  try {
    if (/^\s*(@|\.|h1|a\s*\{)/.test(code)) {
      let css = code;
      if (!/@import "tailwindcss"/.test(css)) css = '@import "tailwindcss";\n' + css;
      const comp = await mk(css);
      comp.build([]);
    } else {
      const classes = [...code.matchAll(/class="([^"]*)"/g)].flatMap(m => m[1].split(/\s+/)).filter(Boolean);
      const miss = [];
      for (const cl of classes) {
        if (marker.has(cl)) continue;
        if (!probe(cl)) miss.push(cl);
      }
      if (miss.length) throw new Error("unknown classes: " + [...new Set(miss)].join(" "));
    }
  } catch (err) { bad++; console.log(id, "|", String(err.message).slice(0, 160)); }
}
console.log(`tailwind: ${n} snippets, ${bad} failed`);
