"use client";

import { useEffect, useState } from "react";

const slides = [
  { id: "hero-1", label: "01 / 03", kicker: "Design systems", title: "Structure that survives contact with real work.", body: "Brand rules, visual language, and production logic built for teams that need to make consistently." },
  { id: "hero-2", label: "02 / 03", kicker: "AI-native tools", title: "Small tools with a clear job to do.", body: "Focused browser utilities and reviewable AI workflows that keep the human decision visible." },
  { id: "hero-3", label: "03 / 03", kicker: "Creative workflows", title: "Generative work with a memory.", body: "Prompts, references, and QA systems that make experiments repeatable instead of accidental." },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(interval);
  }, [paused]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="hero-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }} aria-label="Featured case studies">
      <div className="carousel-frame" aria-live="polite">
        {slides.map((slide, index) => <div key={slide.id} className={`carousel-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active}>
          <div className="hero-slide-content">
            <div className="hero-slide-kicker">{slide.kicker}</div>
            <h2>{slide.title}</h2>
            <p>{slide.body}</p>
          </div>
          <div className="slot-label">{slide.label}</div>
        </div>)}
      </div>
      <button className="carousel-arrow previous" type="button" aria-label="Previous slide" onClick={() => move(-1)}>‹</button>
      <button className="carousel-arrow next" type="button" aria-label="Next slide" onClick={() => move(1)}>›</button>
      <div className="carousel-dots" role="tablist" aria-label="Choose case study">{slides.map((slide, index) => <button key={slide.id} type="button" role="tab" aria-selected={index === active} aria-label={`Go to ${slide.label}`} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} />)}</div>
    </section>
  );
}
