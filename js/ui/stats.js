export function mount(root) {
  root.innerHTML = '<p class="empty">no data yet</p>';
  return () => {};
}
