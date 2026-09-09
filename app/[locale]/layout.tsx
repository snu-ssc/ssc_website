import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/site-data";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const localeMetadata: Record<Locale, { description: string; openGraphLocale: string }> = {
  ko: {
    description: "서울대학교 반도체 학회 SNU SemiCon. 배우고, 만들고, 연결하며 반도체의 내일을 설계합니다.",
    openGraphLocale: "ko_KR",
  },
  en: {
    description: "SNU SemiCon is a Seoul National University community that learns, builds, and connects through semiconductor technology.",
    openGraphLocale: "en_US",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localized = localeMetadata[locale];

  return {
    metadataBase: new URL("https://ssc-website-black.vercel.app"),
    title: { default: "SNU SemiCon", template: "%s | SNU SemiCon" },
    description: localized.description,
    openGraph: {
      title: "SNU SemiCon",
      description: localized.description,
      type: "website",
      locale: localized.openGraphLocale,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <html lang={locale} suppressHydrationWarning><body>{children}</body></html>;
}
