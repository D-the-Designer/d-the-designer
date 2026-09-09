import type { Metadata } from "next";
import { PageFrame, ReviewNote, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = { title: "Freebies — D The Designer", description: "Free tools, GPTs, and downloads from D The Designer." };
type Freebie = { title: string; body: string; href: string; action: string; warning?: string };
const tools: Freebie[] = [
  { title: "Writer", body: "Local-first fiction studio with reviewable AI assistance.", href: "https://storyberth-studio.d-the-designer.chatgpt.site/", action: "Open tool →" },
  { title: "Common Clip", body: "License-safe stock images from Wikimedia Commons — with copy-paste attribution and metadata preserved on every image.", href: "https://d-the-designer.github.io/CommonClip/", action: "Open tool →" },
  { title: "Morse Translator", body: "Translate text to and from Morse code in the browser.", href: "https://d-the-designer.github.io/toys/morse-translator.html", action: "Open tool →" },
  { title: "AI Prompt Compendium", body: "Searchable prompt library with per-prompt copy buttons.", href: "https://d-the-designer.github.io/prompt-compendium/", action: "Open tool →" },
  { title: "Prompt Compendium Builder", body: "Blank version of the compendium — build your own prompt library, no install, nothing leaves your browser.", href: "https://github.com/D-the-Designer/prompt-compendium", action: "Get it on GitHub →" },
];
const cinematic: Freebie[] = [
  { title: "Prompt-o-Matic 9000", body: "Upload an image, choose a character budget, get a structured prompt brief for learning, iteration, and controlled alternates.", href: "https://t.co/zArSDHgaQ8", action: "Open GPT →" },
  { title: "Shot Coverage Engine", body: "Six camera angles from one image — establishing, hero, reverse/OTS, POV, inserts, dramatic — with strict continuity.", href: "https://t.co/ZIdl8G6RDp", action: "Open GPT →" },
  { title: "Character Isolator", body: "Isolates up to six individual characters from a group scene.", href: "https://chatgpt.com/g/g-699616a9b5fc8191810deda89c089c02-character-isolator", action: "Open GPT →" },
  { title: "Keyframe Maker", body: "Turns one image into four adjacent keyframes with locked continuity and cinematic camera coverage.", href: "https://chatgpt.com/g/g-69b897ea6b6881918c5f59884526e6f2-keyframe-maker", action: "Open GPT →" },
  { title: "2 Character Interaction Generator", body: "Drop in an image of two people or portraits, get a multi-angle contact sheet depicting their interaction.", href: "https://chatgpt.com/g/g-69963d3061f08191b06676a4a37f3be8-2-character-interaction-generator", action: "Open GPT →" },
  { title: "Photo Converter", body: "Converts drawings or line art into photos.", href: "https://chatgpt.com/g/g-6995431b4d98819184c9770fd293cb18-photo-converter", action: "Open GPT →" },
];
const illustration: Freebie[] = [
  { title: "Retro Futura", body: "The first custom GPT — sci-fi and surrealism illustrator.", href: "https://t.co/Eg2VOXVUi7", action: "Open GPT →", warning: "shares a link with Skill Stack Builder below — flagged for confirmation" },
  { title: "Retro Futura: Industrial Space", body: "Cinematic image generator based on 60s–80s sci-fi.", href: "https://chatgpt.com/g/g-696ec03166ac81919b416d633936a3e3-retro-futura-industrial-space", action: "Open GPT →" },
  { title: "Pulp-o-Rama!", body: "Pulp sci-fi image generator.", href: "https://chatgpt.com/g/g-nw65jxNYv-pulp-o-rama", action: "Open GPT →" },
];

function FreebieSection({ title, items, accent = false }: { title: string; items: Freebie[]; accent?: boolean }) {
  return <section className="freebies-section"><h2 className={accent ? "accent-heading" : ""}>{title}</h2><div className="freebie-grid">{items.map((item) => <article className="freebie-card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p><a href={item.href} target="_blank" rel="noreferrer">{item.action}</a>{item.warning && <span className="card-warning">⚠ {item.warning}</span>}</article>)}</div></section>;
}

export default function FreebiesPage() {
  const career: Freebie = { title: "Skill Stack Builder", body: "Upload a resume (or roughly describe it) and it talks you through everything that isn't on a traditional resume — hobbies, volunteer work, anything — mapping it to employment categories and billable services.", href: "https://t.co/Eg2VOXVUi7", action: "Open GPT →", warning: "shares a link with Retro Futura above — flagged for confirmation" };
  const fun: Freebie = { title: "TeaGPT", body: "Your gossip columnist knows all the dirt.", href: "https://chatgpt.com/g/g-67d9f167bd508191bb092d7016d5a4a3-teagpt", action: "Open GPT →" };
  return <SiteShell current="freebies"><PageFrame className="subpage freebies-page"><div className="subpage-intro"><h1>Freebies</h1><p>A design technologist&apos;s working archive of tools, GPTs, and downloads — free to use, no strings.</p></div><FreebieSection title="Tools & Apps" items={tools} accent /><FreebieSection title="Cinematic & Visual Production" items={cinematic} /><FreebieSection title="Illustration Generators" items={illustration} /><FreebieSection title="Career" items={[career]} /><section className="just-for-fun"><h2>Just for Fun</h2><div className="freebie-card narrow-card"><h3>{fun.title}</h3><p>{fun.body}</p><a href={fun.href} target="_blank" rel="noreferrer">{fun.action}</a></div></section><ReviewNote>Retro Futura and Skill Stack Builder currently share the same GPT URL. Confirm the distinct link before launch.</ReviewNote></PageFrame></SiteShell>;
}
