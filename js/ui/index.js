import { registry, byId, loadLanguage, plates, addressOf, readyIds } from "../content/registry.js";
import { conceptState } from "../content/progress.js";
import { store } from "../store.js";
import { esc, pad } from "../util.js";

const row = (l) => {
  const par = l.family ? `<span class="par">· ${esc(byId(l.family).short.toLowerCase())}</span>` : "";
  return `<a class="row" href="#/index/${l.id}" style="--pgc: var(--pg-${l.pigment})"><i class="sq"></i><span class="sh">${esc(l.short)}</span><span class="nm">${esc(l.name.toLowerCase())}${par}</span><span class="strip" data-l="${l.id}"></span><span class="vr">${esc(l.version)}</span><span class="tc">${l.topics} topics</span></a>`;
};

const group = (title, items) => `<section class="grp"><h2>${title}</h2>${items.map(row).join("")}</section>`;

export async function mount(root, r, ctx) {
  if (!r.lang) {
    root.innerHTML = `<div class="idx">${group("languages", registry.filter((l) => !l.family))}${group("libraries", registry.filter((l) => l.family))}</div>`;
    for (const id of readyIds()) {
      loadLanguage(id).then((d) => {
        const el = root.querySelector(`.strip[data-l="${id}"]`);
        if (!d || !el) return;
        el.innerHTML = d.topics.flatMap((t) => t.concepts).map((c) => `<i class="${conceptState(d, c, store.state.plates)}"></i>`).join("");
      });
    }
    return () => {};
  }
  const meta = byId(r.lang);
  const data = meta && (await loadLanguage(r.lang));
  if (!data) {
    root.innerHTML = '<p class="empty">no data yet</p>';
    return () => {};
  }
  ctx.crumb([{ t: "index", href: "#/index" }, { t: meta.name.toLowerCase() }]);
  const rec = store.state.plates;
  const all = plates(data);
  root.innerHTML = `<div class="toc">${data.topics
    .map((t) => {
      const items = t.concepts
        .map((c) => {
          const ps = all.filter((x) => x.concept === c);
          const best = Math.max(0, ...ps.map((x) => (rec[x.id] && rec[x.id].bestWpm) || 0));
          return `<a class="lead" href="${addressOf(ps[0])}"><span>${esc(c.title)}</span><i></i><span class="pnum">${pad(t.n)}·${pad(c.n)}</span><span class="bw">${best ? Math.round(best) : "–"}</span></a>`;
        })
        .join("");
      return `<section class="tp"><h3><span>${pad(t.n)}</span>${esc(t.title)}</h3>${items}</section>`;
    })
    .join("")}</div>`;
  return () => {};
}
