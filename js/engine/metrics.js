export const fmtTime = (ms) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function plateStats(plate, end) {
  const t1 = end || plate.tEnd || performance.now();
  const ms = Math.max(1, t1 - plate.t0);
  const keys = plate.log.filter((e) => !e.bs);
  const good = keys.filter((e) => e.ok).length;
  let correct = 0;
  for (const c of plate.cells) if (!c.skip && (c.state === "ok" || c.state === "fixed")) correct++;
  const min = ms / 60000;
  const buckets = Math.max(1, Math.ceil(ms / 1000));
  const per = new Array(buckets).fill(0);
  for (const e of keys) per[Math.min(buckets - 1, Math.floor((e.t - plate.t0) / 1000))]++;
  const wps = per.map((n) => n * 12);
  const full = wps.length > 2 ? wps.slice(0, -1) : wps;
  const mean = full.reduce((a, b) => a + b, 0) / full.length;
  const sd = Math.sqrt(full.reduce((a, b) => a + (b - mean) ** 2, 0) / full.length);
  const cons = full.length < 2 || mean === 0 ? 100 : Math.max(0, 100 * (1 - sd / mean));
  const classes = {};
  for (const e of keys) {
    const k = plate.cells[e.pos].cls;
    const o = classes[k] || (classes[k] = { n: 0, ok: 0 });
    o.n++;
    if (e.ok) o.ok++;
  }
  return {
    ms,
    wpm: correct / 5 / min,
    raw: keys.length / 5 / min,
    acc: keys.length ? good / keys.length : 1,
    cons,
    symbols: classes.punct ? classes.punct.ok / classes.punct.n : 1,
    classes,
    correct,
    keys: keys.length,
    good,
    series: wps
  };
}

export function keyTicks(plate) {
  const out = [];
  let prev = 0;
  for (const e of plate.log) {
    if (e.bs) {
      prev = e.t;
      continue;
    }
    out.push([prev ? Math.min(2000, Math.round(e.t - prev)) : null, e.ok ? 1 : 0]);
    prev = e.t;
  }
  return out;
}

function unitAt(plate, i) {
  const c = plate.cells[i];
  if (!c || (i > 0 && plate.cells[i - 1].tok === c.tok)) return null;
  if (c.cluster) return c.cluster;
  if (c.cls === "punct") return c.ch;
  if (c.cls === "keyword") {
    let j = i;
    while (j < plate.cells.length && plate.cells[j].tok === c.tok) j++;
    return plate.code.slice(i, j);
  }
  return null;
}

export function hesitations(plate) {
  const out = {};
  let prev = 0;
  for (const e of plate.log) {
    if (e.bs) {
      prev = e.t;
      continue;
    }
    const lat = prev ? Math.min(2000, e.t - prev) : null;
    prev = e.t;
    if (lat === null) continue;
    const u = unitAt(plate, e.pos);
    if (!u) continue;
    const o = out[u] || (out[u] = [0, 0]);
    o[0]++;
    o[1] += Math.round(lat);
  }
  return out;
}
