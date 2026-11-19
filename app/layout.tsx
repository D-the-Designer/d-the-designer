import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://d-the-designer.com"),
  title: "D The Designer",
  description: "Design + AI systems for creative teams building with generative tools.",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "D The Designer",
    title: "D The Designer",
    description: "Design + AI systems for creative teams building with generative tools.",
    url: "https://d-the-designer.com/",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Specimen 7-B: a creature turned into a product and merch brand system by D The Designer.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@D_the_Designer",
    title: "D The Designer",
    description: "Design + AI systems for creative teams building with generative tools.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="https://use.typekit.net/uam7agz.css" /></head><body>{children}</body></html>;
}
