import type { Metadata } from "next";
import { PageFrame, SiteShell, externalLinks } from "../components/SiteShell";

export const metadata: Metadata = { title: "Contact — D The Designer", description: "Contact D The Designer by email or find her elsewhere online." };

export default function ContactPage() { return <SiteShell current="contact"><PageFrame className="subpage contact-page"><h1>Contact</h1><p>The fastest way to reach me is email.</p><a className="contact-email" href={externalLinks.email}>hello@d-the-designer.com</a><div className="elsewhere"><strong>Elsewhere</strong><div><a href={externalLinks.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={externalLinks.x} target="_blank" rel="noreferrer">X</a><a href={externalLinks.behance} target="_blank" rel="noreferrer">Behance</a></div></div></PageFrame></SiteShell>; }
