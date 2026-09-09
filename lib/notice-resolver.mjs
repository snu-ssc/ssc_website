export function resolveNotice(notice, locale, getProgram) {
  if (!notice.programSlug) return notice;

  const program = getProgram(locale, notice.programSlug);
  if (!program) throw new Error(`Unknown program notice: ${notice.programSlug}`);

  return {
    ...notice,
    summary: program.summary,
    href: `/${locale}/programs/${program.slug}`,
  };
}
