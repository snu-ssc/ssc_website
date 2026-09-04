import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snu-semicon.com"),
  title: { default: "SNU SemiCon", template: "%s | SNU SemiCon" },
  description: "SNU SemiCon, Seoul National University’s semiconductor community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
