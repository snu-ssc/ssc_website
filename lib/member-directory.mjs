export function filterCompleteMemberEntries(entries) {
  return entries.filter(([name]) => name.trim().length >= 3);
}
