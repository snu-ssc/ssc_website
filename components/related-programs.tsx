import Link from "next/link";
import { getPrograms, type ProgramSlug } from "@/lib/program-data";
import type { Locale } from "@/lib/site-data";

export function RelatedPrograms({ locale, currentSlug }: { locale: Locale; currentSlug: ProgramSlug }) {
  const programs = getPrograms(locale).filter(({ slug }) => slug !== currentSlug);

  return <section className="detail-section related-programs" aria-labelledby="related-programs-title">
    <div className="container">
      <header className="detail-section__header">
        <p className="eyebrow">04 / EXPLORE MORE</p>
        <h2 id="related-programs-title">{locale === "ko" ? "다른 프로그램" : "Related programs"}</h2>
      </header>
      <div className="related-programs__grid">
        {programs.map((program) => <Link className="related-program" href={`/${locale}/programs/${program.slug}`} key={program.slug}>
          <span>{program.index} / {program.tag}</span>
          <h3>{program.title}</h3>
          <p>{program.summary}</p>
          <strong aria-hidden="true">→</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}
