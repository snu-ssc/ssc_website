"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/site-data";
import { landing } from "@/lib/landing-data";

export function SiteHeader({ locale, path = "" }: { locale: Locale; path?: string }) {
  const [open, setOpen] = useState(false);
  const c = landing[locale];
  const other = locale === "ko" ? "en" : "ko";
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path : "";
  const otherHref = `/${other}${safePath}`;
  const nav = [["about", c.nav.about], ["programs", c.nav.programs], ["gallery", c.nav.gallery], ["news", c.nav.news], ["members", locale === "ko" ? "멤버" : "Members"], ["contact", c.nav.contact]] as const;

  return <header className="site-header">
    <div className="container site-header__inner">
      <Link className="brand" href={`/${locale}`} aria-label="SNU SemiCon home"><Image src="/images/brand/logo-letter-alpha.png" alt="SNU SemiCon" width={184} height={60} priority /></Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? (locale === "ko" ? "메뉴 닫기" : "Close menu") : (locale === "ko" ? "메뉴 열기" : "Open menu")} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      <div className={`site-header__menu ${open ? "is-open" : ""}`} id="main-nav">
        <nav aria-label="Primary navigation">
          {nav.map(([id, label]) => <Link key={id} href={id === "members" ? `/${locale}/members` : `/${locale}#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <Link className="language-switch" href={otherHref} aria-label={`Switch to ${other === "ko" ? "Korean" : "English"}`} onClick={() => { window.localStorage.setItem("ssc-language", other); setOpen(false); }}>{other.toUpperCase()}</Link>
      </div>
    </div>
  </header>;
}
