import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about-page";
import { isLocale, locales } from "@/lib/site-data";

type AboutRouteProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale === "ko"
    ? { title: "SSC 소개", description: "함께 배우고 만들며 연결하는 서울대학교 반도체 커뮤니티 SSC를 소개합니다." }
    : { title: "About SSC", description: "Meet SSC, a Seoul National University semiconductor community that learns, builds, and connects together." };
}

export default async function AboutRoute({ params }: AboutRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPage locale={locale} />;
}
