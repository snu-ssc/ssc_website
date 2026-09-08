export function resolveTheme(savedTheme, prefersDark) {
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return prefersDark ? "dark" : "light";
}
