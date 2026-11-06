import { pad } from "../util.js";

const L = (id, name, short, version, topics, family = null, lexer = family ? "python" : id) => ({
  id,
  name,
  short,
  pigment: id,
  family,
  version,
  lexer,
  topics,
  file: `../../data/languages/${id}.js`
});

export const registry = [
  L("python", "Python", "PY", "3.12", 21),
  L("lua", "Lua", "LU", "5.4", 15),
  L("go", "Go", "GO", "1.22", 18),
  L("rust", "Rust", "RS", "2021", 20),
  L("c", "C", "C", "17", 14),
  L("cpp", "C++", "CPP", "20", 18),
  L("csharp", "C#", "CS", "12", 19),
  L("pandas", "pandas", "PD", "2.2", 16, "python"),
  L("polars", "polars", "PL", "1.x", 15, "python"),
  L("numpy", "NumPy", "NP", "2.x", 15, "python"),
  L("pytorch", "PyTorch", "PT", "2.x", 13, "python"),
  L("sklearn", "scikit-learn", "SK", "1.5", 14, "python"),
  L("javascript", "JavaScript", "JS", "ES2023", 16),
  L("typescript", "TypeScript", "TS", "5.x", 14),
  L("sql", "SQL", "SQL", "ANSI", 16),
  L("bash", "Bash", "SH", "5.x", 14),
  L("java", "Java", "JV", "21", 16),
  L("dart", "Dart", "DT", "3.x", 15),
  L("powershell", "PowerShell", "PS", "7.x", 16)
];

export const readyIds = () => [...READY];
export const byId = (id) => registry.find((l) => l.id === id) || null;
export const letter = (vi) => String.fromCharCode(97 + vi);

const READY = new Set(["python", "c", "cpp", "pandas", "numpy", "sklearn", "polars", "lua", "go", "rust", "csharp", "pytorch", "javascript", "typescript"]);
const modules = new Map();
const flat = new WeakMap();

export async function loadLanguage(id) {
  if (modules.has(id)) return modules.get(id);
  const meta = byId(id);
  if (!meta || !READY.has(id)) return null;
  try {
    const m = await import(meta.file);
    modules.set(id, m.default);
    return m.default;
  } catch {
    return null;
  }
}

export function plates(data) {
  if (flat.has(data)) return flat.get(data);
  const out = [];
  for (const topic of data.topics) {
    for (const concept of topic.concepts) {
      concept.examples.forEach((example, vi) => {
        out.push({
          lang: data.id,
          topic,
          concept,
          vi,
          example,
          i: out.length,
          id: `${data.id}/${topic.id}/${concept.id}/${vi}`,
          label: `${data.short} · ${pad(topic.n)} · ${pad(concept.n)} · ${letter(vi)}`
        });
      });
    }
  }
  flat.set(data, out);
  return out;
}

export const find = (data, topic, concept, variant) =>
  plates(data).find((p) => p.topic.id === topic && p.concept.id === concept && letter(p.vi) === variant) || null;

export const neighbor = (data, p, d) => plates(data)[p.i + d] || null;

export const addressOf = (p) => `#/t/${p.lang}/${p.topic.id}/${p.concept.id}/${letter(p.vi)}`;
