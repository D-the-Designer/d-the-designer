import type { Metadata } from "next";
import { PageFrame, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Tools I Use — D The Designer",
  description: "The tools behind Orphan Sky, from voices and music to motion, key frames, talking characters, and finishing.",
};

export default function ToolsPage() {
  return (
    <SiteShell current="tools">
      <PageFrame className="subpage tools-page">
        <h1>Tools I Use</h1>
        <aside className="tools-disclosure" aria-label="Affiliate disclosure">
          <p><strong>Disclosure:</strong> Some links on this page are affiliate links. If you sign up or buy through them, I may earn a commission at no extra cost to you. I'm an independent affiliate of ElevenLabs, Runway, Krea and Hedra. I'm also a Runway Creative Partner and an Adobe Firefly Ambassador, so I get free access and perks from those companies. I only list tools I actually use to make Orphan Sky.</p>
        </aside>
        <p className="tools-intro">These are the tools behind Orphan Sky, the sci-fi world I build one uncanny frame at a time.</p>
        <div className="tools-list">
          <section aria-labelledby="elevenlabs-heading">
            <h2 id="elevenlabs-heading">ElevenLabs: voices and music</h2>
            <p>Every voice in Orphan Sky starts here. I write a character description, design the voice from it, then direct the line with audio tags for breaths, pauses and hesitations. Eleven Music scores the scene, including the warm, slightly-too-cheerful corporate jingles of Proxima.</p>
            <p className="tool-link">→ <a href="https://try.elevenlabs.io/ez4kfs7z1wpc" target="_blank" rel="sponsored noopener">Try ElevenLabs</a> <span>(affiliate link)</span></p>
          </section>
          <section aria-labelledby="runway-heading">
            <h2 id="runway-heading">Runway (with Kling): motion</h2>
            <p>Runway is where my stills start to breathe. I keep camera moves slow and small, because dread and tenderness both live in what barely moves. When a shot needs a different kind of motion, I run Kling inside Runway.</p>
            <p className="tool-pending">Link coming soon</p>
          </section>
          <section aria-labelledby="krea-heading">
            <h2 id="krea-heading">Krea: key frames</h2>
            <p>Each shot starts as one still that I rebuild in Krea until the light feels like a memory you're not sure you're allowed to have. One great frame beats twenty okay ones.</p>
            <p className="tool-pending">Link coming soon</p>
          </section>
          <section aria-labelledby="hedra-heading">
            <h2 id="hedra-heading">Hedra: talking characters</h2>
            <p>When an Orphan Sky character looks into the camera and speaks, that's Hedra, driven by a voice I built in ElevenLabs. I keep the take where the eyes run half a beat behind the words.</p>
            <p className="tool-pending">Link coming soon</p>
          </section>
          <section aria-labelledby="photoshop-heading">
            <h2 id="photoshop-heading">Photoshop: finishing</h2>
            <p>The AI gets me 80% of the way. The last 20% happens in Photoshop: color grade, grain, compositing, fixing hands. That's where the work becomes mine.</p>
            <p className="tool-note">(No affiliate link. I'm an Adobe Firefly Ambassador.)</p>
          </section>
        </div>
      </PageFrame>
    </SiteShell>
  );
}
