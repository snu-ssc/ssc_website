"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const key = "ssc-language";

export function LanguageGate() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("choose")) return;
    const saved = window.localStorage.getItem(key);
    if (saved === "ko" || saved === "en") window.location.replace(`/${saved}`);
  }, []);

  function choose(locale: "ko" | "en") {
    window.localStorage.setItem(key, locale);
  }

  return (
    <main className="language-gate">
      <section className="language-gate__content" aria-labelledby="language-title">
        <Image src="/images/brand/logo-letter.png" alt="SNU SemiCon" width={360} height={108} priority />
        <p className="eyebrow">SNU Semiconductor Club</p>
        <h1 id="language-title">언어를 선택해주세요</h1>
        <p className="language-gate__english">Please select your language</p>
        <div className="button-row language-gate__buttons">
          <Link href="/ko" className="button button--primary" onClick={() => choose("ko")}>한국어</Link>
          <Link href="/en" className="button button--secondary" onClick={() => choose("en")}>English</Link>
        </div>
      </section>
    </main>
  );
}
