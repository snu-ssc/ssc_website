import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ssc-website-black.vercel.app"),
  title: { default: "SNU SemiCon", template: "%s | SNU SemiCon" },
  description: "서울대학교 반도체 학회 SNU SemiCon. 배우고, 만들고, 연결하며 반도체의 내일을 설계합니다.",
  openGraph: { title: "SNU SemiCon", description: "Designing the future of semiconductors, together.", type: "website", locale: "ko_KR" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" suppressHydrationWarning><body>{children}</body></html>;
}
