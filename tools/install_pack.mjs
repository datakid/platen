import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const replace = args.includes("--replace");
const target = args.find((a) => !a.startsWith("--"));
if (!target) {
  console.error("usage: node tools/install_pack.mjs <packs/id> [--replace]");
  process.exit(2);
}
const packDir = resolve(target);
const id = basename(packDir);
const paths = {
  registry: join(root, "js", "content", "registry.js"),
  tokens: join(root, "css", "tokens.css"),
  langs: join(root, "js", "engine", "langs.js"),
  data: join(root, "data", "languages", `${id}.js`)
};
const read = (p) => readFileSync(p, "utf8");
const fail = (msg) => {
  console.error(`install ${id}: ${msg}`);
  process.exit(1);
};

if (!/^[a-z][a-z0-9]*$/.test(id)) fail("the pack folder name must be a lowercase id such as kotlin");
const contentPath = join(packDir, "content.txt");
if (!existsSync(contentPath)) fail("content.txt is missing");
const content = read(contentPath);
const topicCount = content.split("\n").filter((l) => l.startsWith("@@T ")).length;
if (topicCount === 0) fail("content.txt has no @@T topic lines");

const metaPath = join(packDir, "meta.json");
const meta = existsSync(metaPath) ? JSON.parse(read(metaPath)) : {};
const registrySrc = read(paths.registry);
const registered = new RegExp(`L\\("${id}"`).test(registrySrc);

const hex = (h) => {
  const m = /^#([0-9a-f]{6})$/i.exec(h || "");
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lum = ([r, g, b]) => {
  const f = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

let lexerText = null;
if (!registered) {
  for (const k of ["name", "short", "version"]) if (!meta[k]) fail(`meta.json needs "${k}"`);
  if (!/^[A-Z]{1,3}$/.test(meta.short)) fail('"short" must be one to three capital letters');
  const pg = meta.pigment || {};
  const light = hex(pg.light);
  const dark = hex(pg.dark);
  if (!light || !dark) fail('meta.json needs "pigment": { "light": "#RRGGBB", "dark": "#RRGGBB" }');
  const rl = ratio(light, hex("#EFEDE8"));
  const rd = ratio(dark, hex("#0F1012"));
  if (rl < 4.5 || rd < 4.5) fail(`pigment contrast too low (light ${rl.toFixed(2)}, dark ${rd.toFixed(2)}, need 4.5)`);
  if (meta.family && !meta.lexer) fail('a pack with "family" must also name a "lexer" to reuse');
  const langsSrc = read(paths.langs);
  const ownLexer = !meta.lexer || meta.lexer === id;
  if (ownLexer) {
    const lp = join(packDir, "lexer.mjs");
    if (!existsSync(lp)) fail("lexer.mjs is missing (or set meta.lexer to an existing lexer id)");
    const def = (await import(pathToFileURL(lp).href)).default;
    if (!def || !Array.isArray(def.keywords)) fail("lexer.mjs must export default an object with a keywords array");
    lexerText = read(lp)
      .replace(/^\s*export\s+default\s+/, "")
      .replace(/;\s*$/, "")
      .split("\n")
      .join("\n  ");
  } else if (!new RegExp(`^  ${meta.lexer}: \\{`, "m").test(langsSrc)) {
    fail(`lexer "${meta.lexer}" does not exist in js/engine/langs.js`);
  }
}

const dataExisted = existsSync(paths.data);
if (dataExisted && !replace) fail(`data/languages/${id}.js already exists (use --replace)`);
const backups = {
  registry: registrySrc,
  tokens: read(paths.tokens),
  langs: read(paths.langs),
  data: dataExisted ? read(paths.data) : null
};
const rollback = () => {
  writeFileSync(paths.registry, backups.registry);
  writeFileSync(paths.tokens, backups.tokens);
  writeFileSync(paths.langs, backups.langs);
  if (backups.data === null) rmSync(paths.data, { force: true });
  else writeFileSync(paths.data, backups.data);
};

let registry = registrySrc;
let tokens = backups.tokens;
let langs = backups.langs;

if (!registered) {
  const lexerArg = meta.lexer && meta.lexer !== id ? meta.lexer : null;
  const call = [`"${id}"`, JSON.stringify(meta.name), JSON.stringify(meta.short), JSON.stringify(meta.version), String(topicCount)];
  if (meta.family || lexerArg) {
    call.push(meta.family ? JSON.stringify(meta.family) : "null");
    call.push(JSON.stringify(lexerArg || meta.lexer));
  }
  const tail = "\n];\n\nexport const readyIds";
  const at = registry.indexOf(tail);
  if (at < 0) fail("registry.js layout not recognised");
  registry = `${registry.slice(0, at)},\n  L(${call.join(", ")})${registry.slice(at)}`;

  const pgAnchor = "  --pg: var(--pg-python);";
  if (!tokens.includes(pgAnchor)) fail("tokens.css layout not recognised");
  tokens = tokens.replace(pgAnchor, `  --pg-${id}: light-dark(${meta.pigment.light.toUpperCase()}, ${meta.pigment.dark.toUpperCase()});\n${pgAnchor}`);
  const bodyAt = tokens.lastIndexOf('body[data-pg="');
  const lineEnd = tokens.indexOf("\n", bodyAt);
  tokens = `${tokens.slice(0, lineEnd)}\nbody[data-pg="${id}"] { --pg: var(--pg-${id}); }${tokens.slice(lineEnd)}`;

  if (lexerText) {
    const end = langs.lastIndexOf("\n};");
    if (end < 0) fail("langs.js layout not recognised");
    langs = `${langs.slice(0, end)},\n  ${id}: ${lexerText}${langs.slice(end)}`;
  }
}

const ready = /const READY = new Set\(\[([^\]]*)\]\);/.exec(registry);
if (!ready) fail("READY set not found in registry.js");
if (!new RegExp(`"${id}"`).test(ready[1])) registry = registry.replace(ready[0], `const READY = new Set([${ready[1]}, "${id}"]);`);

writeFileSync(paths.registry, registry);
writeFileSync(paths.tokens, tokens);
writeFileSync(paths.langs, langs);
if (dataExisted) rmSync(paths.data);

const indent = Number(meta.indent) || 4;
const author = spawnSync(process.execPath, [join(root, "tools", "author.mjs"), id, contentPath, `--indent=${indent}`], { encoding: "utf8" });
if (author.status !== 0) {
  rollback();
  fail(`content.txt could not be converted:\n${author.stderr || author.stdout}`);
}

const check = spawnSync(process.execPath, [join(root, "tools", "validate.mjs"), id], { encoding: "utf8" });
const smokeSrc = `
import { lexers } from ${JSON.stringify(pathToFileURL(paths.langs).href + `?v=${Date.now()}`)};
import { tokenize } from ${JSON.stringify(pathToFileURL(join(root, "js", "engine", "lexer.js")).href)};
const data = (await import(${JSON.stringify(pathToFileURL(paths.data).href + `?v=${Date.now()}`)})).default;
const def = lexers[data.lexer];
let bad = 0;
for (const t of data.topics) for (const c of t.concepts) c.examples.forEach((e, i) => {
  try {
    const r = tokenize(e.code, def);
    if (!r || r.cls.length !== e.code.length) throw new Error("token map length differs");
  } catch (err) {
    bad++;
    console.log(t.id + "/" + c.id + "/" + i + "  lexer: " + err.message);
  }
});
process.exit(bad ? 1 : 0);
`;
const smoke = spawnSync(process.execPath, ["--input-type=module", "-e", smokeSrc], { encoding: "utf8" });
if (check.status !== 0 || smoke.status !== 0) {
  rollback();
  console.error(`install ${id}: rolled back, nothing was changed`);
  console.error(check.stdout.trim());
  if (smoke.stdout.trim()) console.error(smoke.stdout.trim());
  if (smoke.status !== 0 && smoke.stderr.trim()) console.error(smoke.stderr.trim());
  process.exit(1);
}
console.log(check.stdout.trim());
console.log(`install ${id}: ok${registered ? " (already registered)" : " (registered, pigment and lexer added)"}`);
