type DetailPageHeroProps = {
  eyebrow: string;
  index: string;
  title: string;
  summary: string;
};

export function DetailPageHero({ eyebrow, index, title, summary }: DetailPageHeroProps) {
  return <section className="detail-hero" aria-labelledby="detail-title">
    <div className="container detail-hero__inner">
      <div className="detail-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="detail-title">{title}</h1>
        <p>{summary}</p>
      </div>
      <strong className="detail-hero__index" aria-hidden="true">{index}</strong>
    </div>
  </section>;
}
