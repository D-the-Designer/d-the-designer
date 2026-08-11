"use client";

import { useState } from "react";

const roles = [
  {
    key: "keep",
    label: "KEEP",
    color: "lime",
    title: "Signal stays intact",
    body: "A confident, high-contrast direction that already reads as part of the world.",
    image: "/reference/keep-board.png",
  },
  {
    key: "fix",
    label: "FIX",
    color: "orange",
    title: "Signal needs tuning",
    body: "A promising direction with one clear adjustment before it ships into the system.",
    image: "/reference/fix-board.png",
  },
  {
    key: "reject",
    label: "REJECT",
    color: "violet",
    title: "Signal breaks the brief",
    body: "A useful contrast case: interesting on its own, but not coherent with the specimen.",
    image: "/reference/reject-board.png",
  },
] as const;

const colors = [
  { name: "Signal", hex: "#F5C700", note: "navigation / labels / rules" },
  { name: "Ink", hex: "#0A0A0A", note: "canvas / deep contrast" },
  { name: "Paper", hex: "#FFFFFF", note: "primary type / light surfaces" },
  { name: "Ash", hex: "#CFCFCF", note: "body copy / support" },
  { name: "Moss", hex: "#8BFF3D", note: "approve / live specimen" },
  { name: "Violet", hex: "#8B5CF6", note: "secondary signal" },
  { name: "Hazard", hex: "#FF7D00", note: "attention / alternate" },
];

function SectionLabel({ children, index }: { children: string; index: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function Swatch({ name, hex, note }: (typeof colors)[number]) {
  return (
    <div className="swatch-row">
      <span className="swatch" style={{ backgroundColor: hex }} aria-hidden="true" />
      <span className="swatch-name">{name}</span>
      <span className="swatch-hex">{hex}</span>
      <span className="swatch-note">{note}</span>
    </div>
  );
}

export default function Home() {
  const [activeRole, setActiveRole] = useState<(typeof roles)[number]["key"]>("keep");
  const active = roles.find((role) => role.key === activeRole) ?? roles[0];

  return (
    <main className="site-shell">
      <div className="top-rule" />
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Specimen 7-B home">
          <img src="/reference/avatar.png" alt="Illustrated creator avatar" />
          <span>SPECIMEN 7-B</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#dna">DNA</a>
          <a href="#type">TYPE</a>
          <a href="#components">COMPONENTS</a>
          <a href="#applications">APPLICATIONS</a>
        </nav>
        <span className="header-index">SYSTEM / 01—10</span>
      </header>

      <div id="top" className="hero-grid page-wrap">
        <div className="hero-copy">
          <p className="eyebrow">PRODUCT + MERCH SYSTEM</p>
          <h1>Turn a creature into a brand.</h1>
          <p className="hero-dek">
            A visual design system for strange, collectible worlds — built from the same rules as the specimen board.
          </p>
          <div className="hero-meta">
            <span>FIREWIRE / 07-B</span>
            <span>ART DIRECTION / ACTIVE</span>
          </div>
          <a className="text-link" href="#dna">Explore the system <span aria-hidden="true">↘</span></a>
        </div>
        <figure className="hero-figure">
          <img src="/reference/hero-board.png" alt="Specimen 7-B merchandise board showing packaging, apparel, toys, and lab objects" />
          <figcaption><span>FIG. 01</span><span>THE CREATURE, IN CONTEXT</span></figcaption>
        </figure>
      </div>

      <section id="dna" className="page-wrap section-block dna-section">
        <div className="section-intro">
          <SectionLabel index="01" >DNA</SectionLabel>
          <h2>Short, visible rules keep the board readable.</h2>
          <p>One creature. One brand system. One deliberate visual signal at a time.</p>
        </div>
        <div className="dna-grid">
          <div className="rules-list">
            <div className="rule-group">
              <span className="rule-heading">GOAL</span>
              <p>One recognizable world<br />One repeatable system</p>
            </div>
            <div className="rule-group">
              <span className="rule-heading">TONE</span>
              <p>Fierce<br />Playful<br />Collectible<br />Retro sci-fi</p>
            </div>
            <div className="rule-group">
              <span className="rule-heading">VISUAL RULES</span>
              <p>Green / violet / orange<br />Black field<br />Lab graphics</p>
            </div>
          </div>
          <div className="palette-panel">
            <div className="panel-heading"><span>COLOR ROLES</span><span>07 TOKENS</span></div>
            {colors.map((color) => <Swatch key={color.name} {...color} />)}
          </div>
        </div>
      </section>

      <section id="type" className="page-wrap section-block type-section">
        <div className="section-intro">
          <SectionLabel index="02">TYPE</SectionLabel>
          <h2>Let the headline behave like packaging.</h2>
          <p>Condensed, all-caps, and slightly overdriven. Support copy stays quiet so the specimen can shout.</p>
        </div>
        <div className="type-specimen">
          <div className="type-meta"><span>DISPLAY / 72—128</span><span>ARIAL NARROW / BOLD</span></div>
          <p className="display-sample">THE SIGNAL IS<br /><em>THE SYSTEM.</em></p>
          <div className="type-footer"><span>LABEL / SPECIMEN 7-B</span><span>TRACKING / -0.06em</span></div>
        </div>
      </section>

      <section id="components" className="page-wrap section-block component-section">
        <div className="section-intro">
          <SectionLabel index="03">COMPONENTS</SectionLabel>
          <h2>Every control should feel like a decision.</h2>
          <p>Use color as a verdict, not decoration. The active state below is the same logic used in the gallery.</p>
        </div>
        <div className="component-stage">
          <div className="decision-controls" role="group" aria-label="Decision state">
            {roles.map((role) => (
              <button
                key={role.key}
                className={`decision-button ${role.key} ${activeRole === role.key ? "is-active" : ""}`}
                onClick={() => setActiveRole(role.key)}
                type="button"
              >
                <span className="decision-dot" aria-hidden="true" />
                {role.label}
              </button>
            ))}
          </div>
          <div className={`status-strip ${active.color}`}>
            <span className="status-marker" aria-hidden="true" />
            <span><strong>{active.label}</strong> / {active.title}</span>
            <span className="status-note">{active.body}</span>
          </div>
          <div className="component-examples">
            <div className="component-card"><span className="component-label">BADGE</span><span className="signal-badge">LIVE SIGNAL</span><span className="component-note">Uppercase / tight / useful</span></div>
            <div className="component-card"><span className="component-label">DIVIDER</span><div className="sample-divider" /><span className="component-note">1px ash at 18%</span></div>
            <div className="component-card"><span className="component-label">ACTION</span><button className="yellow-button" type="button">VIEW BOARD <span aria-hidden="true">↗</span></button><span className="component-note">Yellow fill / black type</span></div>
          </div>
        </div>
      </section>

      <section id="applications" className="page-wrap section-block applications-section">
        <div className="section-intro applications-intro">
          <SectionLabel index="04">APPLICATIONS</SectionLabel>
          <h2>Sort, then refine.</h2>
          <p>The art director part is deciding. Choose a lane to inspect the system in context.</p>
        </div>
        <div className="application-shell">
          <div className="application-tabs" role="tablist" aria-label="Application boards">
            {roles.map((role, index) => (
              <button
                key={role.key}
                type="button"
                role="tab"
                aria-selected={activeRole === role.key}
                className={`application-tab ${role.key} ${activeRole === role.key ? "is-active" : ""}`}
                onClick={() => setActiveRole(role.key)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {role.label}
              </button>
            ))}
          </div>
          <div className="application-board">
            <div className="board-copy">
              <p className="eyebrow">{active.label} / BOARD VIEW</p>
              <h3>{active.title}</h3>
              <p>{active.body}</p>
              <div className="board-stats"><span>CONTRAST <b>HIGH</b></span><span>COHERENCE <b>{activeRole === "reject" ? "LOW" : "READY"}</b></span></div>
            </div>
            <figure className="board-image"><img src={active.image} alt={`${active.label} application board`} /><figcaption>FIG. 0{roles.findIndex((role) => role.key === activeRole) + 2} / {active.label}</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="page-wrap final-cta">
        <div>
          <SectionLabel index="05">RECAP</SectionLabel>
          <h2>Make the world around yours.</h2>
        </div>
        <a className="yellow-button" href="#top">Back to top <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="site-footer">
        <span>SPECIMEN 7-B / SYSTEM 01—10</span>
        <span>DESIGNED FROM THE REFERENCE BOARD</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
