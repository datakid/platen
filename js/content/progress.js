import { plates } from "./registry.js";

export function conceptState(data, concept, rec) {
  const ps = plates(data).filter((p) => p.concept === concept);
  if (!ps.some((p) => rec[p.id] && rec[p.id].runs > 0)) return "new";
  const learned = ps.every((p) => {
    const r = rec[p.id];
    return r && r.runs >= 2 && r.accHistory.filter((a) => a >= 97).length >= 2;
  });
  return learned ? "learned" : "seen";
}
