"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/site-data";
import { content } from "@/lib/site-data";

export function SiteHeader({ locale, page }: { locale: Locale; page?: "members" }) {
  const [open, setOpen] = useState(false);
  const c = content[locale];
  const other = locale === "ko" ? "en" : "ko";
  const otherHref = `/${other}${page ? `/${page}` : ""}`;
  const nav = [["about", c.nav.about], ["focus", c.nav.focus], ["projects", c.nav.projects], ["members", c.nav.members], ["contact", c.nav.contact]] as const;

  return <header className="site-header">
    <div className="container site-header__inner">
      <Link className="brand" href={`/${locale}`} aria-label="SNU SemiCon home"><Image src="/images/brand/logo-letter.png" alt="SNU SemiCon" width={184} height={60} priority /></Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      <div className={`site-header__menu ${open ? "is-open" : ""}`} id="main-nav">
        <nav aria-label="Primary navigation">
          {nav.map(([id, label]) => <Link key={id} href={id === "members" ? `/${locale}/members` : `/${locale}#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <Link className="language-switch" href={otherHref} aria-label={`Switch to ${other === "ko" ? "Korean" : "English"}`} onClick={() => { window.localStorage.setItem("ssc-language", other); setOpen(false); }}>{other.toUpperCase()}</Link>
      </div>
    </div>
  </header>;
}
