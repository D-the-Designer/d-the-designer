"use client";

import { useEffect, useState } from "react";

const slides = [
  { id: "hero-1", label: "Case Study 1", caption: "Drop hero image — Case Study 1" },
  { id: "hero-2", label: "Case Study 2", caption: "Drop hero image — Case Study 2" },
  { id: "hero-3", label: "Case Study 3", caption: "Drop hero image — Case Study 3" },
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
          <div className="image-slot" role="img" aria-label={slide.caption}><div className="slot-crosshair" aria-hidden="true" /><span>{slide.caption}</span></div>
          <div className="slot-label">{slide.label}</div>
        </div>)}
      </div>
      <button className="carousel-arrow previous" type="button" aria-label="Previous slide" onClick={() => move(-1)}>‹</button>
      <button className="carousel-arrow next" type="button" aria-label="Next slide" onClick={() => move(1)}>›</button>
      <div className="carousel-dots" role="tablist" aria-label="Choose case study">{slides.map((slide, index) => <button key={slide.id} type="button" role="tab" aria-selected={index === active} aria-label={`Go to ${slide.label}`} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} />)}</div>
    </section>
  );
}
