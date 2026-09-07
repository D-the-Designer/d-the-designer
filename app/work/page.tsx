import type { Metadata } from "next";
import { PageFrame, SiteShell, externalLinks } from "../components/SiteShell";

export const metadata: Metadata = { title: "Work — D The Designer", description: "Case studies and shipped tools from D The Designer." };
const projects = [
  ["Dead Carrier", "An Infocom-style text adventure, built with Claude. Leads with its opening sequence — the case study is about what an AI-assisted interactive-fiction workflow can produce when the writing and the systems logic are both taken seriously.", "https://d-the-designer.github.io/Orphan-Sky-public-content/dead-carrier.html"],
  ["Writer", "A local-first fiction studio with modular, reviewable AI assistance. The manuscript stays primary — every AI suggestion is a proposal that has to be reviewed and deliberately inserted, never a silent edit. Built to support real long-form writing, not just prompt-and-paste.", "https://storyberth-studio.d-the-designer.chatgpt.site/"],
  ["Common Clip", "A tool for finding license-safe stock images sourced from Wikimedia Commons. Attribution copies alongside the image and stays attached as metadata — the kind of detail that matters once an image leaves your desktop and goes into real client work.", "https://d-the-designer.github.io/CommonClip/"],
  ["Morse Translator", "A small, focused browser tool for translating text to and from Morse code — built as a fast, no-fuss utility.", "https://d-the-designer.github.io/toys/morse-translator.html"],
  ["AI Prompt Compendium", "A searchable, categorized library of working prompts with per-prompt copy buttons — plus a companion blank tool anyone can fill with their own prompt collection, no install required.", "https://d-the-designer.github.io/prompt-compendium/"],
] as const;

export default function WorkPage() {
  return <SiteShell current="work"><PageFrame className="subpage work-page"><div className="subpage-heading"><h1>Work</h1><a href={externalLinks.behance} target="_blank" rel="noreferrer">See more on Behance →</a></div><div className="case-study-list">{projects.map(([title, body, live]) => <article className="case-study" key={title}><div className="case-study-heading"><h2>{title}</h2><a className="small-primary" href={live} target="_blank" rel="noreferrer">Try it live →</a></div><p>{title === "AI Prompt Compendium" ? <>{body} <a href="/freebies">See the Freebies page for the blank version.</a></> : body}</p></article>)}</div></PageFrame></SiteShell>;
}
