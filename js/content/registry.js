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
  L("python", "Python", "PY", "3.15", 21),
  L("lua", "Lua", "LU", "5.5", 15),
  L("go", "Go", "GO", "1.27", 18),
  L("rust", "Rust", "RS", "2024", 20),
  L("c", "C", "C", "23", 14),
  L("cpp", "C++", "CPP", "23", 18),
  L("csharp", "C#", "CS", "14", 19),
  L("pandas", "pandas", "PD", "3.1", 16, "python"),
  L("polars", "polars", "PL", "2.x", 15, "python"),
  L("numpy", "NumPy", "NP", "2.x", 15, "python"),
  L("pytorch", "PyTorch", "PT", "2.x", 13, "python"),
  L("sklearn", "scikit-learn", "SK", "1.9", 14, "python"),
  L("javascript", "JavaScript", "JS", "ES2026", 16),
  L("typescript", "TypeScript", "TS", "7.x", 14),
  L("sql", "SQL", "SQL", "ANSI", 16),
  L("bash", "Bash", "SH", "5.x", 14),
  L("java", "Java", "JV", "25", 16),
  L("dart", "Dart", "DT", "3.x", 15),
  L("powershell", "PowerShell", "PS", "7.x", 16),
  L("html", "HTML", "HT", "5", 12),
  L("css", "CSS", "CSS", "2024", 13),
  L("git", "Git", "GIT", "2.x", 12, null, "bash"),
  L("react", "React", "RX", "19.3", 14, "javascript", "javascript"),
  L("django", "Django", "DJ", "6.1", 14, "python", "python"),
  L("fastapi", "FastAPI", "FA", "0.162", 12, "python", "python"),
  L("express", "Express", "XP", "5.x", 12, "javascript", "javascript"),
  L("solid", "Solid", "SD", "1.9", 12, "javascript", "javascript"),
  L("dockerfile", "Dockerfile", "DK", "26", 12),
  L("angular", "Angular", "NG", "22.2", 15, "javascript", "angular"),
  L("svelte", "Svelte", "SV", "5.57", 14, "javascript", "svelte"),
  L("vue", "Vue", "VU", "3.5", 15, "javascript", "vue"),
  L("kotlin", "Kotlin", "KT", "2.4", 14),
  L("swift", "Swift", "SW", "5.10", 14),
  L("elixir", "Elixir", "EX", "1.20", 13),
  L("haskell", "Haskell", "HS", "9.8", 13),
  L("julia", "Julia", "JL", "1.13", 13),
  L("php", "PHP", "PHP", "8.5", 14),
  L("r", "R", "R", "4.6", 13),
  L("ruby", "Ruby", "RB", "4.0", 14),
  L("scala", "Scala", "SC", "3.7", 13),
  L("zig", "Zig", "ZG", "0.17.1", 12),
  L("perl", "Perl", "PRL", "5.44", 12),
  L("json", "JSON", "JSN", "RFC 8259", 10),
  L("yaml", "YAML", "YML", "1.2", 12),
  L("markdown", "Markdown", "MD", "CommonMark 0.31", 12),
  L("fortran", "Fortran", "FT", "2023", 12),
  L("assembly", "x86 Assembly", "ASM", "NASM 2.16", 12),
  L("vba", "VBA", "VBA", "7.1", 12),
  L("m", "M (Power Query)", "M", "Power Query", 12),
  L("mojo", "Mojo", "MJO", "1.2", 12)
];

export const readyIds = () => [...READY];
export const byId = (id) => registry.find((l) => l.id === id) || null;
export const letter = (vi) => String.fromCharCode(97 + vi);

const READY = new Set(["python", "c", "cpp", "pandas", "numpy", "sklearn", "polars", "lua", "go", "rust", "csharp", "pytorch", "javascript", "typescript", "sql", "bash", "java", "powershell", "html", "css", "git", "react", "django", "fastapi", "express", "solid", "dockerfile", "angular", "svelte", "vue", "dart", "kotlin", "swift", "elixir", "haskell", "julia", "php", "r", "ruby", "scala", "zig", "perl", "json", "yaml", "markdown", "fortran", "assembly", "vba", "m", "mojo"]);
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
