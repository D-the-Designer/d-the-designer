import type { ReactNode } from "react";

export type PageKey = "home" | "work" | "freebies" | "about" | "contact" | "support";

const navItems: Array<{ key: PageKey; label: string; href: string }> = [
  { key: "work", label: "Work", href: "/work" },
  { key: "freebies", label: "Freebies", href: "/freebies" },
  { key: "about", label: "About", href: "/about" },
  { key: "support", label: "Support", href: "/support" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export const externalLinks = {
  instagram: "https://instagram.com/the_designer_called_d",
  x: "https://x.com/D_the_Designer",
  behance: "https://www.behance.net/dwilson3",
  github: "https://github.com/D-the-Designer",
  email: "mailto:hello@d-the-designer.com",
};

export function SiteShell({ current, children }: { current: PageKey; children: ReactNode }) {
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="portfolio-nav">
        <a className="portfolio-logo" href="/" aria-label="D the Designer home" aria-current={current === "home" ? "page" : undefined}>D the Designer</a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.key} className={current === item.key ? "is-current" : ""} href={item.href} aria-current={current === item.key ? "page" : undefined}>{item.label}</a>)}
        </nav>
      </header>
      {children}
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-pages"><a href="/">Home</a>{navItems.map((item) => <a key={item.key} href={item.href}>{item.label}</a>)}</div>
      <div className="footer-socials"><a href={externalLinks.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={externalLinks.x} target="_blank" rel="noreferrer">X</a><a href={externalLinks.behance} target="_blank" rel="noreferrer">Behance</a><a href="/support">Support</a><a href={externalLinks.email}>hello@d-the-designer.com</a></div>
    </footer>
  );
}

export function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) { return <main id="main-content" tabIndex={-1} className={`page-frame ${className}`}>{children}</main>; }
export function ReviewNote({ children }: { children: ReactNode }) { return <div className="review-note"><span className="review-label">Review</span>{children}</div>; }
export function ArrowLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) { return <a className={`arrow-link ${secondary ? "secondary" : ""}`} href={href}>{children} <span aria-hidden="true">→</span></a>; }
