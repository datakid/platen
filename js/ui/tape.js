function resolve(name) {
  const p = document.createElement("span");
  p.style.display = "none";
  p.style.color = `var(${name})`;
  document.body.append(p);
  const c = getComputedStyle(p).color;
  p.remove();
  return c;
}

export function createTape(canvas, opt = {}) {
  const ctx = canvas.getContext("2d");
  const step = opt.step || 2;
  let ticks = [];
  let series = [];
  let w = 0;
  let h = 0;
  let col = null;

  const colors = () => col || (col = { ink: resolve("--ink"), dim: resolve("--ink-3"), err: resolve("--error"), rule: resolve("--rule-2") });
  const height = (lat, up) => up * Math.max(0.12, Math.min(1, 1 - ((lat === null ? 400 : lat) - 60) / 440));

  function draw() {
    if (!w) return;
    ctx.clearRect(0, 0, w, h);
    const c = colors();
    const base = Math.round(h * 0.72);
    const up = base - 2;
    const down = h - base - 1;
    ctx.fillStyle = c.rule;
    ctx.fillRect(0, base, w, 1);
    const n = ticks.length;
    const sp = opt.fit ? Math.max(0.5, Math.min(6, (w - 16) / Math.max(n, 1))) : step;
    ticks.forEach(([lat, ok], i) => {
      const x = opt.fit ? Math.floor(8 + i * sp) : Math.floor(w - 4 - (n - 1 - i) * sp);
      if (x < 0 || x > w) return;
      if (ok) {
        const t = Math.max(1, Math.round(height(lat, up)));
        ctx.fillStyle = c.dim;
        ctx.fillRect(x, base - t, 1, t);
      } else {
        ctx.fillStyle = c.err;
        ctx.fillRect(x, base + 1, 1, Math.max(3, down));
      }
    });
    if (series.length > 1) {
      const max = Math.max(1, ...series);
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 1;
      ctx.beginPath();
      series.forEach((v, i) => {
        const x = 8 + (i * (w - 16)) / (series.length - 1);
        const y = base - (v / max) * up * 0.95;
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      });
      ctx.stroke();
    }
  }

  function size() {
    const r = canvas.getBoundingClientRect();
    const d = window.devicePixelRatio || 1;
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    draw();
  }

  const refresh = () => {
    col = null;
    draw();
  };
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", refresh);

  return {
    push(lat, ok) {
      ticks.push([lat, ok]);
      if (ticks.length > 4000) ticks.shift();
      draw();
    },
    reset() {
      ticks = [];
      draw();
    },
    set(t, s) {
      ticks = t;
      series = s || [];
      draw();
    },
    size,
    refresh,
    destroy() {
      mq.removeEventListener("change", refresh);
    }
  };
}
