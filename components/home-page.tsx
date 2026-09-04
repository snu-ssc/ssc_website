import Image from "next/image";
import Link from "next/link";
import { AreaTabs } from "@/components/area-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { content, type Locale } from "@/lib/site-data";

function Lines({ children }: { children: string }) {
  return <>{children.split("\n").map((line, index) => <span key={line}>{line}{index < children.split("\n").length - 1 && <br />}</span>)}</>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <><SiteHeader locale={locale} /><main>
    <section className="hero">
      <Image className="hero__otter" src="/images/brand/logo-수달만.png" alt="" width={720} height={570} priority />
      <div className="container hero__grid">
        <div className="hero__copy"><p className="eyebrow">{c.hero.school}</p><h1><Lines>{c.hero.title}</Lines></h1><p className="hero__description"><Lines>{c.hero.description}</Lines></p></div>
        <div className="hero__aside"><p><Lines>{c.hero.statement}</Lines></p><ul aria-label="SSC pillars"><li>Learn</li><li>Build</li><li>Connect</li></ul><div className="button-row"><a className="button button--primary" href="#about">{c.hero.primary}</a><a className="button button--secondary" href="#projects">{c.hero.secondary}</a></div></div>
      </div>
    </section>
    <section className="section section--soft" id="about"><div className="container section-heading"><div><p className="eyebrow">About SSC</p><h2><Lines>{c.about.title}</Lines></h2></div><p>{c.about.description}</p></div><div className="container pillar-grid">{c.about.pillars.map((pillar, index) => <article key={pillar.title} className="pillar-card"><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.body}</p></article>)}</div></section>
    <section className="section" id="focus"><div className="container focus-layout"><div><p className="eyebrow">{c.areas.eyebrow}</p><h2>{c.areas.title}</h2><p>{c.areas.description}</p></div><AreaTabs items={c.areas.items} /></div></section>
    <section className="section section--soft" id="projects"><div className="container section-heading"><div><p className="eyebrow">{c.projects.eyebrow}</p><h2>{c.projects.title}</h2></div><p>{c.projects.description}</p></div><div className="container project-grid">{c.projects.items.map((project, index) => <article className="project-card" key={project.title}>{project.image && <div className="project-card__image"><Image src={project.image} alt={project.alt ?? ""} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>}<div className="project-card__body"><span>0{index + 1}</span><h3>{project.title}</h3><p>{project.body}</p></div></article>)}</div></section>
    <section className="section" id="members"><div className="container section-heading"><div><p className="eyebrow">{c.members.eyebrow}</p><h2><Lines>{c.members.title}</Lines></h2></div><div><p>{c.members.description}</p><Link className="button button--secondary" href={`/${locale}/members`}>{c.members.button}</Link></div></div></section>
    <section className="section contact" id="contact"><div className="container section-heading"><div><p className="eyebrow">{c.contact.eyebrow}</p><h2>{c.contact.title}</h2></div><div><p className="contact__lead">{c.contact.lead}</p><p>{c.contact.description}</p></div></div><div className="container contact__links"><a href="mailto:snusemiconductor@gmail.com"><span aria-hidden="true">↗</span><strong>Email</strong><small>snusemiconductor@gmail.com</small></a><a href="https://www.instagram.com/snu.ssc/" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span><strong>Instagram</strong><small>@snu.ssc <span className="sr-only">(opens in a new tab)</span></small></a></div></section>
  </main><SiteFooter locale={locale} /></>;
}
