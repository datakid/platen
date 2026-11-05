const M = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => M[c]);
export const pad = (n) => String(n).padStart(2, "0");
