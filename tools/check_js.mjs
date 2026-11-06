import vm from "node:vm";
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const mod = await import(`../data/languages/${process.argv[2] || "javascript"}.js`);
const only = process.argv.slice(3);
const items = [];
for (const t of mod.default.topics)
  for (const c of t.concepts)
    c.examples.forEach((e, i) => items.push({ id: `${t.id}/${c.id}/${i}`, code: e.code }));

const dir = mkdtempSync(join(tmpdir(), "platen_js_"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function makeContext() {
  const user = { name: "ada", age: 36, address: { city: "london" } };
  const fetchStub = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ id: 1, name: "ada" }),
    text: async () => "ok",
  });
  return vm.createContext({
    console: { log() {}, error() {}, warn() {} },
    user,
    users: [user, { name: "grace", age: 85 }],
    nums: [1, 2, 3, 4, 5],
    sleep,
    fetch: fetchStub,
    readLater: (cb) => cb(null, "data"),
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    URL,
    URLSearchParams,
    FormData,
    AbortController,
    AbortSignal,
    structuredClone,
    Promise,
    Symbol,
    Date,
    TextEncoder,
    queueMicrotask,
  });
}

let bad = 0;
let n = 0;
for (const it of items) {
  if (only.length && !only.some((o) => it.id.startsWith(o))) continue;
  n++;
  let err = null;
  if (/\b(import|export)\b/.test(it.code)) {
    const f = join(dir, `s${n}.mjs`);
    writeFileSync(f, it.code);
    const r = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
    if (r.status !== 0) err = (r.stderr.split("\n").find((l) => /Error/.test(l)) || r.stderr).slice(0, 140);
    if (err && /top-level await|await is only valid/.test(err)) err = null;
  } else {
    const ctx = makeContext();
    let rejected = null;
    const onRej = (e) => (rejected = e);
    process.once("unhandledRejection", onRej);
    try {
      const p = vm.runInContext(`(async () => {\n${it.code}\n})()`, ctx, { timeout: 2000 });
      await Promise.race([p, sleep(1500).then(() => "timeout")]);
      await sleep(30);
      if (rejected) err = `${rejected.name}: ${rejected.message}`.slice(0, 140);
    } catch (e) {
      err = `${e.name}: ${e.message}`.slice(0, 140);
    }
    process.removeListener("unhandledRejection", onRej);
  }
  if (err) {
    bad++;
    console.log(it.id, " | ", err);
  }
}
rmSync(dir, { recursive: true, force: true });
console.log(`ran ${n} snippets, ${bad} failed`);
process.exit(0);
