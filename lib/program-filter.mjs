export function filterPrograms(items, category) {
  return category === "All" ? items : items.filter((item) => item.category === category);
}
