import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "D The Designer", description: "Design + AI systems for creative teams building with generative tools.", icons: { icon: "/favicon.svg?v=2", shortcut: "/favicon.svg?v=2" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="https://use.typekit.net/uam7agz.css" /></head><body>{children}</body></html>;
}
