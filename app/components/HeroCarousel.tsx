"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: "make-a-monster",
    kicker: "Adobe Firefly Ambassador · AI workflow",
    title: "Make a Monster",
    body: "A 22-slide Firefly Boards tutorial, from shape remixing and model comparison to a finished creature.",
    image: "/work/ambassador/make-a-monster-creature.jpg",
    imageAlt: "A purple creature in a glowing containment tank, created through the Make a Monster visual workflow.",
    href: "/work#make-a-monster",
  },
  {
    id: "specimen-7b",
    kicker: "Adobe Firefly Ambassador · Brand system",
    title: "Specimen 7-B",
    body: "A creature becomes a coherent product and merchandise world, refined through a Keep / Fix / Reject review.",
    image: "/work/ambassador/brand-final.jpg",
    imageAlt: "The Specimen 7-B product and merchandise system, including packaging, apparel, toys, and labels.",
    href: "/work#specimen-7b",
  },
  {
    id: "escape-of-the-specimen",
    kicker: "Adobe Firefly Ambassador · Art direction",
    title: "The Escape of the Specimen!",
    body: "Turn an existing creature project into a vivid 1970s pulp monster-movie poster.",
    image: "/work/ambassador/escape-cover.jpg",
    imageAlt: "The Escape of the Specimen! pulp monster-movie poster featuring Specimen 7-B above a city.",
    href: "/work#escape-of-the-specimen",
  },
  {
    id: "technicolor-fantastique",
    kicker: "Adobe Firefly Ambassador · Visual direction",
    title: "Art Direction with Aesthetic Boards",
    body: "A curated Technicolor Fantastique board guides the visual decisions behind a finished portrait.",
    image: "/work/ambassador/art-direction-cover.jpg",
    imageAlt: "A seated woman in a pale gown, the final portrait art-directed from a Technicolor Fantastique mood board.",
    href: "/work#technicolor-fantastique",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused || interacting) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(interval);
  }, [interacting, paused]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
      aria-label="Featured work"
    >
      <div className="carousel-frame" aria-live={interacting || paused ? "polite" : "off"}>
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            id={`carousel-${slide.id}`}
            className={`carousel-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
            inert={index !== active}
          >
            <div className="carousel-image">
              <img src={slide.image} alt={slide.imageAlt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
            </div>
            <div className="hero-slide-content">
              <div className="hero-slide-kicker">{slide.kicker}</div>
              <h2>{slide.title}</h2>
              <p>{slide.body}</p>
              <a className="hero-slide-link" href={slide.href}>Explore this project <span aria-hidden="true">→</span></a>
            </div>
            <div className="slot-label">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</div>
          </article>
        ))}
      </div>
      <div className="carousel-controls" role="group" aria-label="Carousel controls">
        <button className="carousel-arrow previous" type="button" aria-label="Previous project" onClick={() => move(-1)}>‹</button>
        <div className="carousel-dots" role="group" aria-label="Choose a featured project">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-pressed={index === active}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button className="carousel-arrow next" type="button" aria-label="Next project" onClick={() => move(1)}>›</button>
        <button
          className="carousel-toggle"
          type="button"
          aria-pressed={paused}
          aria-label={paused ? "Resume automatic slide changes" : "Pause automatic slide changes"}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
