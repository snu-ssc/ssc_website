import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetailPage } from "@/components/program-detail-page";
import { getProgram, getPrograms, programSlugs, type ProgramSlug } from "@/lib/program-data";
import { isLocale, locales } from "@/lib/site-data";

type ProgramRouteProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getPrograms(locale).map(({ slug }) => ({ locale, slug })));
}

function isProgramSlug(value: string): value is ProgramSlug {
  return programSlugs.includes(value as ProgramSlug);
}

async function resolveProgram(params: ProgramRouteProps["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProgramSlug(slug)) notFound();
  const program = getProgram(locale, slug);
  if (!program) notFound();
  return { locale, program };
}

export async function generateMetadata({ params }: ProgramRouteProps): Promise<Metadata> {
  const { locale, program } = await resolveProgram(params);
  return {
    title: program.title,
    description: program.summary,
    alternates: {
      canonical: `/${locale}/programs/${program.slug}`,
      languages: { ko: `/ko/programs/${program.slug}`, en: `/en/programs/${program.slug}` },
    },
  };
}

export default async function ProgramRoute({ params }: ProgramRouteProps) {
  const { locale, program } = await resolveProgram(params);
  return <ProgramDetailPage locale={locale} program={program} />;
}
