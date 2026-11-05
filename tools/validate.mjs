import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { validateLanguage } from "./validate.js";
import { registry } from "../js/content/registry.js";
import { lexers } from "../js/engine/langs.js";

const root = dirname(fileURLToPath(import.meta.url));
const dir = join(root, "..", "data", "languages");
const want = process.argv.slice(2);
const files = readdirSync(dir).filter((f) => f.endsWith(".js") && (!want.length || want.includes(f.slice(0, -3))));
let total = 0;
let plates = 0;
for (const f of files) {
  const data = (await import(pathToFileURL(join(dir, f)).href)).default;
  const meta = registry.find((l) => l.id === data.id);
  const issues = validateLanguage(data, meta, lexers);
  const n = data.topics.reduce((a, t) => a + t.concepts.reduce((b, c) => b + c.examples.length, 0), 0);
  plates += n;
  console.log(`${data.id}: ${data.topics.length} topics, ${n} plates, ${issues.length} issues`);
  for (const i of issues) console.log(`  ${i.where}  ${i.msg}`);
  total += issues.length;
}
console.log(total ? `${total} issues` : `clean, ${plates} plates`);
process.exit(total ? 1 : 0);
