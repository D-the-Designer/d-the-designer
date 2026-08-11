import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Specimen 7-B — Product + Merch System",
  description: "A dark editorial design system for turning a creature into a brand.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Specimen 7-B — Product + Merch System",
    description: "A dark editorial design system for turning a creature into a brand.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "Specimen 7-B product and merch system" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Specimen 7-B — Product + Merch System",
    description: "A dark editorial design system for turning a creature into a brand.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
