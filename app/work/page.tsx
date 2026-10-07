import type { Metadata } from "next";
import { PageFrame, SiteShell, externalLinks } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Work — D The Designer",
  description: "Adobe Firefly Ambassador case studies, creative workflows, and selected design technology work by D The Designer.",
};

type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

type Project = {
  id: string;
  title: string;
  category: string;
  role: string;
  problem: string;
  method: string;
  result: string;
  images?: ProjectImage[];
  pdfUrl?: string;
  pdfLabel?: string;
  threadUrl?: string;
  live?: string;
  disclosure?: string;
};

const ambassadorProjects: Project[] = [
  {
    id: "make-a-monster",
    title: "Adobe Firefly / Make a Monster",
    category: "AI creative workflow · Ambassador tutorial",
    role: "Visual workflow, comparison, documentation, and production",
    problem: "How do you turn generative exploration into a coherent visual development process instead of an image dump?",
    method: "Research and references → visual reduction → concept development → cross-model comparison → concept-drift correction → still-to-motion production.",
    result: "A documented 22-slide workflow that makes the decisions, comparisons, and production logic visible.",
    images: [
      {
        src: "/work/ambassador/make-a-monster-creature.jpg",
        alt: "The Specimen 7-B creature in a green-lit containment tank, shown during the Make a Monster workflow.",
        caption: "The creature concept later reused in the Specimen 7-B projects.",
      },
    ],
    pdfUrl: "https://github.com/D-the-Designer/Tutorials/blob/main/MAKE%20A%20MONSTER%21%21%20.pdf",
    pdfLabel: "Open the published 22-slide tutorial ↗",
  },
  {
    id: "specimen-7b",
    title: "Specimen 7-B — Product + Merch System",
    category: "Generative brand system · Output evaluation · #Ad",
    role: "Brand direction, product exploration, and output curation",
    problem: "How do you move from one creature image to a recognizable, repeatable product and merchandise world?",
    method: "Define the creature and brand DNA, explore applications, then sort and refine the results with a visible Keep / Fix / Reject pass.",
    result: "A nine-slide case study that makes the visual rules, applications, and curation decisions public.",
    images: [
      {
        src: "/work/ambassador/brand-final.jpg",
        alt: "Specimen 7-B products and packaging shown together as a finished fictional merchandise system.",
        caption: "The selected Specimen 7-B product world.",
      },
      {
        src: "/work/ambassador/brand-applications.jpg",
        alt: "A Firefly Boards comparison of packaging, apparel, toys, labels, and social applications for Specimen 7-B.",
        caption: "Compare different applications as one product family.",
      },
      {
        src: "/work/ambassador/brand-curation.jpg",
        alt: "Keep, Fix, and Reject boards used to curate the Specimen 7-B outputs.",
        caption: "Selection and correction are part of the design system.",
      },
    ],
    pdfUrl: "/work/ambassador/specimen-7b-product-merch-system.pdf",
    pdfLabel: "Read the 9-slide project PDF ↗",
    threadUrl: "https://x.com/D_the_Designer/status/2086697750398455896",
    disclosure: "Adobe Firefly Ambassador · paid partnership disclosed on X (#Ad).",
  },
  {
    id: "escape-of-the-specimen",
    title: "The Escape of the Specimen!",
    category: "Existing image → pulp poster · Firefly Boards · #Ad",
    role: "Art direction, workflow development, and visual refinement",
    problem: "How can an existing creature image become a finished pulp movie poster without restarting the project?",
    method: "Reuse the Specimen 7-B source, isolate and simplify the creature, build the city separately, combine references, then refine the strongest composition and type hierarchy.",
    result: "A ten-slide workflow showing how to keep good decisions while changing only what needs work.",
    images: [
      {
        src: "/work/ambassador/escape-cover.jpg",
        alt: "The Escape of the Specimen! pulp monster-movie poster, with Specimen 7-B above a crowded city.",
        caption: "The final 1970s pulp monster-movie poster.",
      },
      {
        src: "/work/ambassador/escape-source.jpg",
        alt: "A Firefly Boards view using the original Specimen 7-B image as the source reference.",
        caption: "Start from the creature already made in Make a Monster.",
      },
      {
        src: "/work/ambassador/escape-refinement.jpg",
        alt: "Before-and-after comparison of the poster's type hierarchy and image composition.",
        caption: "Change the type hierarchy without rebuilding the illustration.",
      },
    ],
    pdfUrl: "/work/ambassador/the-escape-of-the-specimen.pdf",
    pdfLabel: "Read the 10-slide project PDF ↗",
    threadUrl: "https://x.com/D_the_Designer/status/2098276350864052532",
    disclosure: "Adobe Firefly Ambassador · paid partnership disclosed on X (#Ad).",
  },
  {
    id: "technicolor-fantastique",
    title: "Art Direction with Aesthetic Boards",
    category: "Creative direction · Firefly Boards · #Ad",
    role: "Visual direction, reference curation, comparison, and final selection",
    problem: "How do you translate a broad aesthetic direction into one coherent portrait while keeping the visual decisions easy to compare?",
    method: "Build the Technicolor Fantastique board, select individual assets and a palette, compare room and character studies, then combine the chosen references and upscale the final image.",
    result: "A ten-slide case study that follows one portrait from a curated direction board to a selected final composition.",
    images: [
      {
        src: "/work/ambassador/art-direction-cover.jpg",
        alt: "A woman in a pale gown seated in a richly colored Gothic room, the final Technicolor Fantastique portrait.",
        caption: "The selected portrait, art-directed from the mood board.",
      },
      {
        src: "/work/ambassador/art-direction-board.jpg",
        alt: "The Technicolor Fantastique board with visual references, original studies, materials, and color palettes.",
        caption: "A working board of separate assets and palette references.",
      },
      {
        src: "/work/ambassador/art-direction-final.jpg",
        alt: "Firefly Boards comparison of generated portrait compositions before the final upscale.",
        caption: "Compare compositions and choose the strongest image.",
      },
    ],
    pdfUrl: "/work/ambassador/art-direction-aesthetic-boards.pdf",
    pdfLabel: "Read the 10-slide project PDF ↗",
    threadUrl: "https://x.com/D_the_Designer/status/2103609891067985984",
    disclosure: "Adobe Firefly Ambassador · paid partnership disclosed on X (#Ad).",
  },
];

const selectedProjects: Project[] = [
  {
    id: "dead-carrier",
    title: "Dead Carrier",
    category: "Interaction / creative technology",
    role: "Creative direction, writing, interface, and implementation",
    problem: "How can an AI-assisted interactive-fiction workflow produce a complete, playable experience while keeping the writing and systems logic deliberate?",
    method: "Story structure → interface logic → implementation → opening sequence → playable delivery.",
    result: "A working Infocom-style text adventure with a clear relationship between narrative, rules, and interface.",
    live: "https://d-the-designer.github.io/Orphan-Sky-public-content/dead-carrier.html",
  },
  {
    id: "orphan-sky",
    title: "Orphan Sky",
    category: "Transmedia creative direction / visual systems",
    role: "Worldbuilding, visual development, and production language",
    problem: "How do you keep a large fictional world visually coherent across interfaces, artifacts, moving image, and narrative material?",
    method: "Visual grammar → interface language → design bible → artifacts → production pipeline → consistency review.",
    result: "A sustained worldbuilding practice framed as creative direction and transmedia systems, not as a standalone fictional universe.",
    live: "https://github.com/D-the-Designer/Orphan-Sky-public-content",
  },
  {
    id: "tools",
    title: "Working tools and conventional design",
    category: "UI/UX · graphic production · technical documentation",
    role: "Interface design, visual communication, and delivery",
    problem: "How do you make a small tool or visual system understandable, usable, and ready to leave the desktop?",
    method: "Information hierarchy → interface behavior → accessibility → implementation → testing → handoff.",
    result: "A body of shipped browser tools, identity, layout, UI, print, and documentation work represented by live tools and selected case studies on this site.",
    live: externalLinks.github,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <article className="case-study" id={project.id}>
      <div className="case-study-heading">
        <div>
          <span className="card-category">{project.category}</span>
          <h2>{project.title}</h2>
        </div>
        <div className="case-study-actions">
          {project.pdfUrl && (
            <a className="small-primary" href={project.pdfUrl} target={isExternal(project.pdfUrl) ? "_blank" : undefined} rel={isExternal(project.pdfUrl) ? "noreferrer" : undefined}>
              {project.pdfLabel ?? "Read the project PDF ↗"}
            </a>
          )}
          {project.threadUrl && (
            <a className="case-study-secondary" href={project.threadUrl} target="_blank" rel="noreferrer">
              View original X thread ↗
            </a>
          )}
          {!project.pdfUrl && project.live && (
            <a className="small-primary" href={project.live} target={isExternal(project.live) ? "_blank" : undefined} rel={isExternal(project.live) ? "noreferrer" : undefined}>
              Inspect work ↗
            </a>
          )}
        </div>
      </div>
      {project.images && (
        <div className={`case-study-gallery${project.images.length === 1 ? " case-study-gallery-single" : ""}`} aria-label={`Selected images from ${project.title}`}>
          {project.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="case-study-facts">
        <div><strong>Problem</strong><p>{project.problem}</p></div>
        <div><strong>My role</strong><p>{project.role}</p></div>
        <div><strong>System / method</strong><p>{project.method}</p></div>
        <div><strong>Result</strong><p>{project.result}</p></div>
      </div>
      {project.disclosure && <p className="case-study-disclosure">{project.disclosure}</p>}
    </article>
  );
}

export default function WorkPage() {
  return (
    <SiteShell current="work">
      <PageFrame className="subpage work-page">
        <div className="subpage-heading">
          <div>
            <span className="eyebrow">Employment evidence</span>
            <h1>Selected work</h1>
            <p className="subpage-dek">Four Adobe Firefly Ambassador projects, with visual process samples, full carousel PDFs, and links to the original campaign threads.</p>
          </div>
          <a href={externalLinks.github} target="_blank" rel="noreferrer">See current public projects on GitHub →</a>
        </div>
        <div className="case-study-list">
          {ambassadorProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
          {selectedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
        <section className="work-cta">
          <h2>Need a system that can survive real work?</h2>
          <p>Bring me into a project when the challenge is part visual, part technical, and part operational.</p>
          <a className="primary-button" href="/contact">Hire / contact me</a>
        </section>
      </PageFrame>
    </SiteShell>
  );
}
