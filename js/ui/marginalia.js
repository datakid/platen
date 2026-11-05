import { esc } from "../util.js";

const NS = "http://www.w3.org/2000/svg";

export function createMarginalia(o) {
  let list = [];
  let act = null;

  function sync() {
    for (const el of [...o.margin.children, ...o.list.children, ...o.svg.children]) {
      el.classList.toggle("on", act !== null && Number(el.dataset.i) === act);
    }
  }

  function build() {
    o.margin.textContent = "";
    o.list.textContent = "";
    o.svg.textContent = "";
    const sp = o.spans();
    list = o
      .plate()
      .notes.map((n, i) => ({ ...n, i }))
      .filter((n) => n.start >= 0)
      .sort((a, b) => a.start - b.start);
    list.forEach((n, k) => {
      const d = document.createElement("div");
      d.className = "note";
      d.dataset.i = n.i;
      d.textContent = n.text;
      o.margin.append(d);
      n.el = d;
      const li = document.createElement("li");
      li.dataset.i = n.i;
      li.innerHTML = `<span class="k">${k + 1}</span><span>${esc(n.text)}</span>`;
      o.list.append(li);
      if (sp[n.end - 1]) sp[n.end - 1].dataset.m = String(k + 1);
    });
  }

  function layout() {
    o.svg.textContent = "";
    if (!list.length || getComputedStyle(o.margin).display === "none") return;
    const plate = o.plate();
    const sp = o.spans();
    const { chW, lineH } = o.metrics();
    const sr = o.stage.getBoundingClientRect();
    const ml = o.margin.getBoundingClientRect().left - sr.left;
    let floor = 0;
    list.forEach((n, k) => {
      const a = sp[n.start].getBoundingClientRect();
      const b = sp[n.end - 1].getBoundingClientRect();
      const line = plate.cells[n.start].line;
      const top = Math.max(line * lineH, floor);
      n.el.style.top = `${top}px`;
      floor = top + n.el.offsetHeight + 4;
      const x0 = Math.round((a.left + b.right) / 2 - sr.left) + 0.5;
      const yb = Math.round((line + 1) * lineH - 3) + 0.5;
      const xm = Math.round(ml - chW * 1.5 + k * 4) + 0.5;
      const ny = Math.round(top + 10.5) + 0.5;
      const xn = Math.round(ml - 4) + 0.5;
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", `M${x0} ${yb}H${xm}V${ny}H${xn}`);
      p.setAttribute("class", "ld");
      p.dataset.i = n.i;
      o.svg.append(p);
    });
    sync();
  }

  return {
    build,
    layout,
    activate(i) {
      const next = i === null || i === undefined ? null : i;
      if (next === act) return;
      act = next;
      sync();
    }
  };
}
