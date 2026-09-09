import Image from "next/image";
import { DetailPageHero } from "@/components/detail-page-hero";
import { RecruitmentCta } from "@/components/recruitment-cta";
import { RelatedPrograms } from "@/components/related-programs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ProgramDetail } from "@/lib/program-data";
import type { Locale } from "@/lib/site-data";

export function ProgramDetailPage({ locale, program }: { locale: Locale; program: ProgramDetail }) {
  const overviewTitle = locale === "ko" ? "프로그램 소개" : "Program overview";
  const detailsTitle = locale === "ko" ? "진행 방식" : "How it works";
  const galleryTitle = locale === "ko" ? "현장 기록" : "Field notes";

  return <>
    <SiteHeader locale={locale} path={`/programs/${program.slug}`} />
    <main className="detail-page">
      <DetailPageHero eyebrow={`${program.category} / ${program.tag}`} index={program.index} title={program.title} summary={program.summary} />
      <section className="detail-section detail-overview" aria-labelledby="program-overview-title">
        <div className="container detail-intro">
          <div><p className="eyebrow">01 / OVERVIEW</p><h2 id="program-overview-title">{overviewTitle}</h2></div>
          <p>{program.overview}</p>
        </div>
      </section>
      <section className="detail-section detail-section--surface" aria-labelledby="program-details-title">
        <div className="container">
          <header className="detail-section__header"><p className="eyebrow">02 / DETAILS</p><h2 id="program-details-title">{detailsTitle}</h2></header>
          <div className="detail-card-grid">
            {program.sections.map((section) => <article className="detail-card" key={`${section.eyebrow}-${section.title}`}>
              <p className="eyebrow">{section.eyebrow}</p>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </article>)}
          </div>
        </div>
      </section>
      {program.images && program.images.length > 0 && <section className="detail-section detail-gallery" aria-labelledby="program-gallery-title">
        <div className="container">
          <header className="detail-section__header"><p className="eyebrow">03 / GALLERY</p><h2 id="program-gallery-title">{galleryTitle}</h2></header>
          <div className="detail-gallery__grid">
            {program.images.map((image, index) => <figure key={image.src}>
              <Image src={image.src} alt={image.alt} width={index === 0 ? 4032 : 3920} height={index === 0 ? 3024 : 2205} sizes="(max-width: 800px) 100vw, 50vw" />
              <figcaption>{String(index + 1).padStart(2, "0")} / {image.alt}</figcaption>
            </figure>)}
          </div>
        </div>
      </section>}
      <RelatedPrograms locale={locale} currentSlug={program.slug} />
      <RecruitmentCta locale={locale} />
    </main>
    <SiteFooter locale={locale} />
  </>;
}
