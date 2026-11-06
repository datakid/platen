import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { registry } from "../js/content/registry.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [id, chunk, ...flags] = process.argv.slice(2);
if (!id || !chunk) {
  console.error("usage: node tools/author.mjs <id> <chunk.txt> [--indent=N]");
  process.exit(2);
}
const meta = registry.find((l) => l.id === id);
if (!meta) {
  console.error(`unknown language ${id}`);
  process.exit(2);
}
const indentFlag = flags.find((f) => f.startsWith("--indent="));
const file = join(root, "data", "languages", `${id}.js`);

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

function gofmt(code) {
  const tabbed = code
    .split("\n")
    .map((l) => {
      const n = l.length - l.trimStart().length;
      return "\t".repeat(Math.floor(n / 4)) + " ".repeat(n % 4) + l.trimStart();
    })
    .join("\n");
  const r = spawnSync("gofmt", [], { input: tabbed + "\n", encoding: "utf8" });
  if (r.status !== 0) return code;
  return r.stdout
    .replace(/\n+$/, "")
    .split("\n")
    .map((l) => {
      const m = l.match(/^\t*/)[0].length;
      return " ".repeat(4 * m) + l.slice(m);
    })
    .join("\n");
}

const topics = [];
let topic = null;
let concept = null;
let example = null;
const closeExample = () => {
  if (!example) return;
  while (example.lines.length && example.lines[example.lines.length - 1].trim() === "") example.lines.pop();
  example.code = example.lines.join("\n");
  concept.examples.push(example);
  example = null;
};
const lines = readFileSync(chunk, "utf8").split("\n");
for (const raw of lines) {
  if (raw.startsWith("@@T ")) {
    closeExample();
    const [tid, title] = raw.slice(4).split("|").map((s) => s.trim());
    topic = { id: tid, title, concepts: [] };
    topics.push(topic);
    concept = null;
  } else if (raw.startsWith("@@C ")) {
    closeExample();
    const [cid, title, level, ...g] = raw.slice(4).split("|").map((s) => s.trim());
    concept = { id: cid, title, level: Number(level), gloss: g.join("|"), examples: [] };
    topic.concepts.push(concept);
  } else if (raw === "@@E") {
    closeExample();
    example = { lines: [], notes: [] };
  } else if (/^@@N\d* /.test(raw)) {
    const m = raw.match(/^@@N(\d*) (.*?) ==> (.*)$/);
    if (!m) throw new Error(`bad note line: ${raw}`);
    const note = { at: m[2], text: m[3] };
    if (m[1] !== "") note.nth = Number(m[1]);
    example.notes.push(note);
  } else if (example) {
    example.lines.push(raw);
  }
}
closeExample();

let src;
if (existsSync(file)) {
  src = readFileSync(file, "utf8");
} else {
  const indent = indentFlag ? Number(indentFlag.split("=")[1]) : 4;
  src =
    `export default {\n  id: ${JSON.stringify(meta.id)},\n  name: ${JSON.stringify(meta.name)},\n  short: ${JSON.stringify(meta.short)},\n` +
    `  pigment: ${JSON.stringify(meta.pigment)},\n  family: ${JSON.stringify(meta.family)},\n  version: ${JSON.stringify(meta.version)},\n` +
    `  lexer: ${JSON.stringify(meta.lexer)},\n  indent: ${indent},\n  topics: [\n  ]\n};\n`;
}

const topicCount = (src.match(/^ {4}\{\n {6}id: /gm) || []).length;
let next = topicCount + 1;

const out = topics.map((t) => {
  const n = next++;
  const cs = t.concepts.map((c, ci) => {
    const ex = c.examples
      .map((e) => {
        const code = id === "go" ? gofmt(e.code) : e.code;
        const notes = e.notes.map((x) => `{ at: ${JSON.stringify(x.at)}, text: ${JSON.stringify(x.text)}${x.nth !== undefined ? `, nth: ${x.nth}` : ""} }`);
        return `            { code: \`${esc(code)}\`, notes: [${notes.join(", ")}] }`;
      })
      .join(",\n");
    return (
      `        {\n          id: ${JSON.stringify(c.id)}, n: ${ci + 1}, title: ${JSON.stringify(c.title)}, level: ${c.level},\n` +
      `          gloss: ${JSON.stringify(c.gloss)},\n          examples: [\n${ex}\n          ]\n        }`
    );
  });
  return `    {\n      id: ${JSON.stringify(t.id)},\n      n: ${n},\n      title: ${JSON.stringify(t.title)},\n      concepts: [\n${cs.join(",\n")}\n      ]\n    }`;
});

const tail = "\n  ]\n};\n";
const at = src.lastIndexOf(tail);
if (at < 0) throw new Error("data file tail not found");
const head = src.slice(0, at);
const joiner = topicCount ? ",\n" : "\n";
writeFileSync(file, head + joiner + out.join(",\n") + tail);
console.log(`${id}: appended ${out.length} topics, now ${topicCount + out.length}`);
