export function nextMenuOpenState(isOpen) {
  return !isOpen;
}

export function closeOnEscape(isOpen, key) {
  return key === "Escape" ? false : isOpen;
}
