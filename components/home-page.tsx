"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { landing, type Locale } from "@/lib/landing-data";
import { closeOnEscape, nextMenuOpenState } from "@/lib/mobile-nav-state.mjs";
import { closeOverlayOnEscape } from "@/lib/overlay-state.mjs";
import "./home-page.module.css";

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = landing[locale];
  const [dark, setDark] = useState(false); const [menuOpen, setMenuOpen] = useState(false); const [program, setProgram] = useState("All");
  const [galleryItem, setGalleryItem] = useState<(typeof copy.gallery)[number] | null>(null); const [selectedProgram, setSelectedProgram] = useState<(typeof copy.programs)[number] | null>(null); const [query, setQuery] = useState(""); const [noticeType, setNoticeType] = useState("All"); const [faq, setFaq] = useState<number | null>(0);
  useReveal();
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      setGalleryItem((item) => closeOverlayOnEscape(item, event.key));
      setSelectedProgram((item) => closeOverlayOnEscape(item, event.key));
      setMenuOpen((isOpen) => closeOnEscape(isOpen, event.key));
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);
  const filteredPrograms = program === "All" ? copy.programs : copy.programs.filter((item) => item.category === program);
  const filteredNotices = useMemo(() => copy.notices.filter((item) => (noticeType === "All" || item.type === noticeType) && `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase())), [copy.notices, noticeType, query]);
  const nav = [["about", copy.nav.about], ["programs", copy.nav.programs], ["gallery", copy.nav.gallery], ["news", copy.nav.news], ["contact", copy.nav.contact]];
  return <div className="site-shell">
    <header className="topbar"><div className="container topbar__inner">
      <Link className="wordmark" href={`/${locale}`} aria-label="SNU SemiCon home"><Image src="/images/brand/logo-letter-alpha.png" alt="SNU SemiCon" width={240} height={100} priority /></Link>
      <nav id="primary-navigation" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">{nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="topbar__actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}>{dark ? "☼" : "◐"}</button><Link className="locale-button" href={`/${locale === "ko" ? "en" : "ko"}`}>{locale === "ko" ? "EN" : "KO"}</Link><button className="menu-toggle" onClick={() => setMenuOpen(nextMenuOpenState)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}><i /><i /></button></div>
    </div></header>
    <main>
      <section className="hero-v2" aria-labelledby="hero-title"><div className="hero-v2__grid" aria-hidden="true" /><div className="hero-v2__orb hero-v2__orb--one" /><div className="hero-v2__orb hero-v2__orb--two" /><div className="hero-v2__otter" aria-hidden="true"><Image src="/images/brand/otter-hero-alpha.png" alt="" fill priority sizes="(max-width: 800px) 92vw, 58vw" /></div>
        <div className="container hero-v2__content"><p className="kicker">SNU SEMICON · EST. 2025</p><h1 id="hero-title">{copy.hero.title}</h1><p className="hero-v2__lede">{copy.hero.lede}</p><div className="hero-v2__actions"><a className="cta cta--solid" href="#programs">{copy.hero.primary} <span>↗</span></a><a className="cta cta--ghost" href="#about">{copy.hero.secondary}</a></div><div className="hero-v2__metrics" aria-label="SSC highlights">{copy.metrics.map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</div></div><div className="hero-v2__circuit" aria-hidden="true"><span /><span /><span /><span /></div><a className="scroll-cue" href="#about"><span />SCROLL TO EXPLORE</a>
      </section>
      <section id="about" className="section-v2 about-v2"><div className="container section-intro" data-reveal><div><p className="kicker">01 / ABOUT SSC</p><h2>{copy.about.title}</h2></div><p>{copy.about.description}</p></div><div className="container value-grid">{copy.about.values.map((item, index) => <article className="value-card" data-reveal key={item.title} style={{ transitionDelay: `${index * 80}ms` }}><span className="value-card__number">0{index + 1}</span><span className="value-card__icon">{item.icon}</span><h3>{item.title}</h3><p>{item.description}</p><span className="value-card__line" /></article>)}</div></section>
      <section id="programs" className="section-v2 programs-v2"><div className="container section-intro" data-reveal><div><p className="kicker">02 / PROGRAMS</p><h2>{copy.programSection.title}</h2></div><p>{copy.programSection.description}</p></div><div className="container"><div className="filter-row" aria-label="프로그램 필터">{copy.categories.map((category) => <button key={category} className={program === category ? "is-active" : ""} aria-pressed={program === category} onClick={() => setProgram(category)}>{category}</button>)}</div><div className="program-grid">{filteredPrograms.map((item, index) => <article className="program-card" data-reveal key={item.title}><div className={`program-card__visual visual-${index % 4}`}><span>{item.tag}</span><b>{item.index}</b></div><div className="program-card__copy"><p>{item.category}</p><h3>{item.title}</h3><span>{item.description}</span><button onClick={() => setSelectedProgram(item)} aria-haspopup="dialog" aria-label={`${item.title} 자세히 보기`}>자세히 보기 <i>→</i></button></div></article>)}</div></div></section>
      <section id="gallery" className="section-v2 gallery-v2"><div className="container gallery-heading" data-reveal><div><p className="kicker">03 / MOMENTS</p><h2>{copy.gallerySection.title}</h2></div><p>{copy.gallerySection.description}</p></div><div className="container mosaic">{copy.gallery.map((item, index) => <button className={`mosaic__item mosaic__item--${index + 1} ${item.visual ? "mosaic__item--visual" : ""}`} key={item.title} onClick={() => setGalleryItem(item)} aria-label={`${item.title} 상세 보기`}>{item.image ? <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <div className="mosaic__circuit" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>}<span><small>{item.label}</small><strong>{item.title}</strong><i>↗</i></span></button>)}</div></section>
      <section id="news" className="section-v2 news-v2"><div className="container section-intro" data-reveal><div><p className="kicker">04 / NEWS & SCHEDULE</p><h2>{copy.newsSection.title}</h2></div><p>{copy.newsSection.description}</p></div><div className="container news-controls"><label className="search-field"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} aria-label="공지 검색" /></label><div className="notice-filter">{copy.noticeTypes.map((type) => <button key={type} onClick={() => setNoticeType(type)} className={noticeType === type ? "is-active" : ""}>{type}</button>)}</div></div><div className="container notice-list">{filteredNotices.map((item) => <article key={item.title} className="notice-row" data-reveal><time>{item.date}<small>{item.month}</small></time><span className={`notice-tag notice-tag--${item.type === "Event" ? "event" : "notice"}`}>{item.type}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div><button aria-label={`${item.title} 열기`}>↗</button></article>)}{filteredNotices.length === 0 && <p className="empty-state">검색 결과가 없습니다.</p>}</div></section>
      <section className="section-v2 faq-v2"><div className="container faq-layout"><div data-reveal><p className="kicker">05 / FAQ</p><h2>{copy.faqSection.title}</h2><p>{copy.faqSection.description}</p></div><div className="accordion" data-reveal>{copy.faq.map((item, index) => <article key={item.question} className={faq === index ? "is-open" : ""}><h3><button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index}>{item.question}<span>+</span></button></h3><div><p>{item.answer}</p></div></article>)}</div></div></section>
      <section id="contact" className="contact-v2"><div className="container contact-v2__inner" data-reveal><p className="kicker">LET&apos;S CONNECT</p><h2>{copy.contact.title}</h2><p>{copy.contact.description}</p><div><a className="cta cta--light" href="mailto:snusemiconductor@gmail.com">{copy.contact.button} <span>↗</span></a><a className="social-link" href="https://www.instagram.com/snu.ssc/" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></section>
    </main>
    <footer className="footer-v2"><div className="container footer-v2__inner"><Image src="/images/brand/logo-letter-alpha.png" alt="SNU SemiCon" width={220} height={92} /><p>Seoul National University<br />Semiconductor Club</p><span>© {new Date().getFullYear()} SNU SemiCon</span></div></footer>
    {galleryItem && <div className="modal-backdrop" role="presentation" onMouseDown={() => setGalleryItem(null)}><section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setGalleryItem(null)} aria-label="닫기">×</button>{galleryItem.image && <div className="gallery-modal__image"><Image src={galleryItem.image} alt={galleryItem.alt} fill sizes="90vw" /></div>}<div><p className="kicker">{galleryItem.label}</p><h2 id="gallery-modal-title">{galleryItem.title}</h2><p>{galleryItem.detail}</p></div></section></div>}
    {selectedProgram && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedProgram(null)}><section className="gallery-modal program-modal" role="dialog" aria-modal="true" aria-labelledby="program-modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProgram(null)} aria-label="닫기">×</button><div className="program-modal__visual"><span>{selectedProgram.tag}</span><strong>{selectedProgram.index}</strong></div><div><p className="kicker">{selectedProgram.category}</p><h2 id="program-modal-title">{selectedProgram.title}</h2><p>{selectedProgram.detail}</p></div></section></div>}
  </div>;
}
