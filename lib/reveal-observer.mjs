export function observeRevealNodes(nodes, observe) {
  for (const node of nodes) {
    if (typeof node?.matches !== "function") continue;
    if (node.matches("[data-reveal]")) observe(node);
    node.querySelectorAll?.("[data-reveal]").forEach(observe);
  }
}
