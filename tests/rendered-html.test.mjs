import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../github-pages/", import.meta.url);
const routes = ["index.html", "work/index.html", "freebies/index.html", "about/index.html", "contact/index.html", "support/index.html", "tools/index.html"];

async function htmlFor(route) {
  return readFile(new URL(route, root), "utf8");
}

test("exports every portfolio route as static HTML", async () => {
  for (const route of routes) {
    const html = await htmlFor(route);
    assert.match(html, /D THE DESIGNER/i, route);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i, route);
    assert.doesNotMatch(html, /ko-fi\.com\/dthedesigner/i, route);
  }
});

test("keeps support links on the site and off the retiring handle", async () => {
  const home = await htmlFor("index.html");
  const support = await htmlFor("support/index.html");
  assert.match(home, /href="\/support"/);
  assert.match(support, /href="https:\/\/ko-fi\.com\/W7W51H0316\/\?hidefeed=true&amp;widget=true&amp;embed=true"/);
});

test("exports the career-conversion content", async () => {
  const home = await htmlFor("index.html");
  assert.match(home, /Design Technologist &amp; Visual Systems Designer/i);
  assert.match(home, /Adobe Firefly \/ Make a Monster/i);
  assert.match(home, /Specimen 7-B/i);
  assert.match(home, /What I solve/i);
  assert.match(home, /Résumé available on request/i);

  const work = await htmlFor("work/index.html");
  assert.match(work, /Problem/i);
  assert.match(work, /System \/ method/i);
  assert.match(work, /KEEP \/ FIX \/ REJECT/i);

  const about = await htmlFor("about/index.html");
  assert.match(about, /1996–2000/i);
  assert.match(about, /Earlier software QA/i);
});

test("keeps the public identity brand-first", async () => {
  for (const route of ["index.html", "about/index.html", "contact/index.html"]) {
    const html = await htmlFor(route);
    assert.doesNotMatch(html, /Dreia Wilson/i, route);
    assert.match(html, /D the Designer/i, route);
  }
});

test("ships the supplied headshot asset", async () => {
  await access(new URL("public/headshot.jpg", new URL("../", import.meta.url)));
});

test("makes the tools page discoverable and discloses its only active affiliate link", async () => {
  for (const route of routes) {
    assert.match(await htmlFor(route), /href="\/tools\/"(?: aria-current="page")?>Tools I Use<\/a>/);
  }
  const html = await htmlFor("tools/index.html");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main);
  assert.match(main, /<h1>Tools I Use<\/h1>/);
  assert.ok(main.indexOf('aria-label="Affiliate disclosure"') < main.indexOf('<a '));
  assert.match(main, /href="https:\/\/try\.elevenlabs\.io\/ez4kfs7z1wpc" target="_blank" rel="sponsored noopener">Try ElevenLabs<\/a> <span>\(affiliate link\)<\/span>/);
  assert.equal((main.match(/<a /g) ?? []).length, 1);
  assert.equal((main.match(/Link coming soon/g) ?? []).length, 3);
  assert.doesNotMatch(main, /\[RUNWAY CODE\]|\[KREA LINK\]|\[HEDRA LINK\]|25% off/);
  for (const tool of ["ElevenLabs", "Runway (with Kling)", "Krea", "Hedra", "Photoshop"]) {
    assert.ok(main.includes(tool));
  }
});
