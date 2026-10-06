import type { Metadata } from "next";
import { PageFrame, SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Support — D The Designer",
  description: "Support D the Designer's independent creative tools and visual work.",
};

const kofiTipPanel = "https://ko-fi.com/W7W51H0316/?hidefeed=true&widget=true&embed=true";

export default function SupportPage() {
  return <SiteShell current="support"><PageFrame className="subpage support-page">
    <span className="eyebrow">Support independent work</span>
    <h1>Help me keep making useful things.</h1>
    <p>I share apps, plugins, prompts, tutorials, and visual experiments for AI, storytelling, and graphic design. If that work has helped you, you can leave a tip here.</p>
    <section className="support-panel" aria-label="Support with Ko-fi">
      <strong>Support on Ko-fi</strong>
      <p>Choose a one-time or monthly tip on Ko-fi’s payment page.</p>
      <a className="primary-button" href={kofiTipPanel} target="_blank" rel="noreferrer">Leave a tip →</a>
    </section>
    <p className="support-note">Payment opens on Ko-fi. You can always return to this page at d-the-designer.com/support.</p>
  </PageFrame></SiteShell>;
}
