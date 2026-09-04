import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { isLocale, locales } from "@/lib/site-data";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
