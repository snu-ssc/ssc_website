import type { Locale } from "@/lib/site-data";
import { recruitmentFormUrl } from "@/lib/recruitment.mjs";

export function RecruitmentCta({ locale }: { locale: Locale }) {
  const copy = locale === "ko"
    ? { eyebrow: "2026 하반기 모집", title: "SSC와 다음 회로를 함께 그려보세요.", body: "반도체를 함께 배우고 만들며 성장할 새로운 구성원을 기다립니다.", action: "지원서 작성하기" }
    : { eyebrow: "2026 FALL RECRUITMENT", title: "Design the next circuit with SSC.", body: "We are looking for new members ready to learn, build, and grow together.", action: "Open application" };

  return <section className="recruitment-cta" aria-labelledby="recruitment-title">
    <div className="container recruitment-cta__inner">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="recruitment-title">{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <a className="recruitment-cta__link" href={recruitmentFormUrl} target="_blank" rel="noopener noreferrer">
        {copy.action} <span aria-hidden="true">↗</span><span className="sr-only"> ({locale === "ko" ? "새 탭에서 열림" : "opens in a new tab"})</span>
      </a>
    </div>
  </section>;
}
