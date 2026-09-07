import type { Metadata } from "next";
import { ArrowLink, PageFrame, SiteShell } from "./components/SiteShell";
import { HeroCarousel } from "./components/HeroCarousel";

export const metadata: Metadata = { title: "D The Designer — Design + AI systems", description: "Design and AI systems for creative teams building with generative tools." };

const featured = [
  { title: "Dead Carrier", blurb: "An Infocom-style text adventure, built with Claude — from opening sequence to full playable story.", live: "https://d-the-designer.github.io/Orphan-Sky-public-content/dead-carrier.html" },
  { title: "Writer", blurb: "A local-first fiction studio with reviewable AI assistance — the manuscript stays primary, AI output is always a proposal.", live: "https://storyberth-studio.d-the-designer.chatgpt.site/" },
  { title: "Morse Translator", blurb: "A small, focused browser tool for translating text to and from Morse code.", live: "https://d-the-designer.github.io/toys/morse-translator.html" },
];

export default function Home() {
  return <SiteShell current="home"><PageFrame className="home-page">
    <HeroCarousel />
    <section className="home-headline"><h1>Design + AI systems for creative teams building with generative tools</h1><p>Brand systems, prompt engineering, and small AI-native tools — built and shipped, not just pitched.</p><div className="button-row"><a className="primary-button" href="/work">View Work</a><a className="secondary-button" href="/freebies">Browse Freebies</a></div></section>
    <section className="credentials-strip" aria-label="Credentials"><div><strong>Adobe Ambassador</strong></div><div><strong>Creative Partner</strong><span>ImagineArt</span></div><div><strong>Creative Partner</strong><span>Pollo</span></div><div><strong>Creative Partner</strong><span>Vidu</span></div><div><strong>Inaugural Member</strong><span>Stages (The 100)</span></div></section>
    <section className="home-section"><div className="section-heading"><h2>Featured Work</h2><ArrowLink href="/work" secondary>See all work</ArrowLink></div><div className="featured-grid">{featured.map((project) => <article className="featured-card" key={project.title}><h3>{project.title}</h3><p>{project.blurb}</p><div className="card-links"><a href={project.live} target="_blank" rel="noreferrer">Try it →</a><a href="/work" className="muted-link">Case study</a></div></article>)}</div></section>
    <section className="freebie-teaser"><div><span className="eyebrow">Freebie</span><h2>AI Prompt Compendium</h2><p>A searchable library of working prompts, plus a blank version anyone can fill with their own — no install, works offline.</p></div><a className="primary-button" href="/freebies">See all freebies</a></section>
  </PageFrame></SiteShell>;
}
