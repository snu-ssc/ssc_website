import { notFound } from "next/navigation";
import { MembersPage } from "@/components/members-page";
import { isLocale, locales } from "@/lib/site-data";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function MembersRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MembersPage locale={locale} />;
}
