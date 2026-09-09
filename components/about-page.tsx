import { DetailPageHero } from "@/components/detail-page-hero";
import { RecruitmentCta } from "@/components/recruitment-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { landing, type Locale } from "@/lib/landing-data";

export function AboutPage({ locale }: { locale: Locale }) {
  const home = landing[locale];
  const copy = locale === "ko"
    ? { eyebrow: "ABOUT SSC", title: "함께 배우고, 만들고, 연결합니다.", summary: "SNU SemiCon은 반도체를 더 깊이 탐구하고 직접 설계하며 성장하는 서울대학교 학생 커뮤니티입니다.", values: "우리가 함께하는 방식", mission: "전공과 경험의 경계를 넘어", missionBody: "처음 시작하는 사람의 질문부터 깊어진 기술적 고민까지, 서로 다른 관점을 연결해 한 단계 더 나아갑니다.", faq: "자주 묻는 질문" }
    : { eyebrow: "ABOUT SSC", title: "Learn, build, and connect together.", summary: "SNU SemiCon is a Seoul National University student community for exploring semiconductors, designing with intent, and growing together.", values: "How we work together", mission: "Beyond majors and experience levels", missionBody: "From first questions to deeper technical challenges, we connect different perspectives and help one another take the next step.", faq: "Frequently asked questions" };

  return <>
    <SiteHeader locale={locale} path="/about" />
    <main className="detail-page about-detail">
      <DetailPageHero eyebrow={copy.eyebrow} index="00" title={copy.title} summary={copy.summary} />
      <section className="detail-section" aria-labelledby="about-values-title">
        <div className="container">
          <header className="detail-section__header"><p className="eyebrow">01 / LEARN · BUILD · CONNECT</p><h2 id="about-values-title">{copy.values}</h2></header>
          <div className="detail-card-grid detail-card-grid--three">
            {home.about.values.map((value, index) => <article className="detail-card" key={value.title}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p><h3>{value.title}</h3><p>{value.description}</p>
            </article>)}
          </div>
        </div>
      </section>
      <section className="detail-section detail-section--surface" aria-labelledby="about-mission-title">
        <div className="container detail-intro">
          <div><p className="eyebrow">02 / OUR MISSION</p><h2 id="about-mission-title">{copy.mission}</h2></div>
          <p>{copy.missionBody}</p>
        </div>
      </section>
      <section className="detail-section" aria-labelledby="about-faq-title">
        <div className="container">
          <header className="detail-section__header"><p className="eyebrow">03 / FAQ</p><h2 id="about-faq-title">{copy.faq}</h2></header>
          <div className="detail-faq">
            {home.faq.map((item, index) => <article key={item.question}>
              <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.question}</h3><p>{item.answer}</p></div>
            </article>)}
          </div>
        </div>
      </section>
      <RecruitmentCta locale={locale} />
    </main>
    <SiteFooter locale={locale} />
  </>;
}
