import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const mod = await import("../data/languages/typescript.js");
const only = process.argv.slice(2);
const dir = mkdtempSync(join(tmpdir(), "platen_ts_"));
const files = new Map();
let n = 0;
for (const t of mod.default.topics)
  for (const c of t.concepts)
    c.examples.forEach((e, i) => {
      const id = `${t.id}/${c.id}/${i}`;
      if (only.length && !only.some((o) => id.startsWith(o))) return;
      n++;
      const name = `s${String(n).padStart(4, "0")}.ts`;
      const isModule = /^\s*(import|export)\b/m.test(e.code);
      const ambient = /declare module "/.test(e.code);
      const code = isModule || ambient ? e.code : `${e.code}\nexport {};`;
      writeFileSync(join(dir, name), code + "\n");
      files.set(name, id);
    });
writeFileSync(
  join(dir, "tsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      strict: true,
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      lib: ["ES2023", "DOM", "DOM.Iterable"],
      noEmit: true,
      skipLibCheck: true,
      types: [],
      isolatedModules: false,
    },
    include: ["*.ts"],
  }),
);
const r = spawnSync("tsc", ["-p", dir, "--pretty", "false"], { encoding: "utf8", maxBuffer: 1 << 26 });
const ignore = /TS2307|TS2792|TS2882/;
const bad = new Map();
for (const line of (r.stdout + r.stderr).split("\n")) {
  const m = line.match(/^(s\d{4}\.ts)\((\d+),(\d+)\): error (TS\d+): (.*)$/);
  if (!m || ignore.test(m[4])) continue;
  if (!bad.has(m[1])) bad.set(m[1], `${m[4]} (line ${m[2]}): ${m[5].slice(0, 120)}`);
}
for (const [f, msg] of bad) console.log(files.get(f), " | ", msg);
console.log(`checked ${files.size} snippets with tsc, ${bad.size} failed`);
rmSync(dir, { recursive: true, force: true });
