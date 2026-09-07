export function closeOverlayOnEscape(currentOverlay, key) {
  return key === "Escape" ? null : currentOverlay;
}
