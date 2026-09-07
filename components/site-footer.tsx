import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/site-data";
import { content } from "@/lib/site-data";

export function SiteFooter({ locale, includeEmail = true }: { locale: Locale; includeEmail?: boolean }) {
  const c = content[locale];
  return <footer className="site-footer">
    <div className="container site-footer__inner">
      <div><Image src="/images/brand/logo-letter-alpha.png" alt="SNU SemiCon" width={188} height={58} /><p className="site-footer__school"><Image src="/images/brand/snu-emblem.png" alt="" width={30} height={30} />{c.footer.school}</p></div>
      <nav aria-label="Footer navigation">{includeEmail && <a href="mailto:snusemiconductor@gmail.com">Email</a>}<a href="https://www.instagram.com/snu.ssc/" target="_blank" rel="noreferrer">Instagram<span className="sr-only"> (opens in a new tab)</span></a><Link href="/?choose=1">{c.footer.language}</Link></nav>
    </div>
  </footer>;
}
