import { store } from "../store.js";

let cur = null;

export function enter(key) {
  if (!cur || cur.key !== key) cur = { key, plates: [] };
}

export function record(meta, rec) {
  enter(meta.key);
  cur.plates.push(rec);
  cur.plates = cur.plates.slice(-12);
  store.update((s) => {
    s.last = { at: Date.now(), ...meta, plates: cur.plates };
  });
}
