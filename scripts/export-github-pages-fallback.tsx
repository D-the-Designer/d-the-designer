import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../app/page";
import WorkPage from "../app/work/page";
import FreebiesPage from "../app/freebies/page";
import AboutPage from "../app/about/page";
import ContactPage from "../app/contact/page";

const root = join(process.cwd(), "github-pages");
const publicRoot = join(process.cwd(), "public");
const cssSource = await readFile(join(process.cwd(), "app/globals.css"), "utf8");
const css = cssSource
  .replace(/^@import\s+"tailwindcss";\s*/m, "")
  .replace(/@theme inline \{[^}]+\}\s*/m, "");

const pages = [
  { path: "/", title: "D The Designer — Design + AI systems", description: "Design Technologist and Visual Systems Designer building visual systems and AI-assisted creative workflows." , Component: HomePage },
  { path: "/work", title: "Work — D The Designer", description: "Selected case studies and shipped tools from D The Designer.", Component: WorkPage },
  { path: "/freebies", title: "Freebies — D The Designer", description: "Free tools, GPTs, and downloads from D The Designer.", Component: FreebiesPage },
  { path: "/about", title: "About — D The Designer", description: "About D the Designer, a Design Technologist and Visual Systems Designer.", Component: AboutPage },
  { path: "/contact", title: "Contact — D The Designer", description: "Hire or contact D the Designer, a Design Technologist and Visual Systems Designer.", Component: ContactPage },
] as const;

const carouselScript = `
<script>
(() => {
  const root = document.querySelector('.hero-carousel');
  if (!root) return;
  const slides = [...root.querySelectorAll('.carousel-slide')];
  const dots = [...root.querySelectorAll('.carousel-dots button')];
  let active = 0;
  const show = (next) => {
    active = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.classList.toggle('is-active', index === active); slide.setAttribute('aria-hidden', String(index !== active)); });
    dots.forEach((dot, index) => { dot.classList.toggle('is-active', index === active); dot.setAttribute('aria-selected', String(index === active)); });
  };
  root.querySelector('.previous')?.addEventListener('click', () => show(active - 1));
  root.querySelector('.next')?.addEventListener('click', () => show(active + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
})();
</script>`;

function documentFor(page: (typeof pages)[number], body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><meta name="description" content="${page.description}"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="https://use.typekit.net/uam7agz.css"><style>${css}</style></head><body>${body}${carouselScript}</body></html>`;
}

await rm(root, { recursive: true, force: true });
await mkdir(root, { recursive: true });
await cp(publicRoot, root, { recursive: true });

for (const page of pages) {
  const body = renderToStaticMarkup(<page.Component />);
  const destination = page.path === "/" ? join(root, "index.html") : join(root, page.path.slice(1), "index.html");
  await mkdir(join(destination, ".."), { recursive: true });
  await writeFile(destination, documentFor(page, body));
}

await writeFile(join(root, "CNAME"), "d-the-designer.com\n");
console.log(`Exported ${pages.length} static routes to ${root}`);
