import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../github-pages/", import.meta.url);
const routes = ["index.html", "work/index.html", "freebies/index.html", "about/index.html", "contact/index.html"];

async function htmlFor(route) {
  return readFile(new URL(route, root), "utf8");
}

test("exports every portfolio route as static HTML", async () => {
  for (const route of routes) {
    const html = await htmlFor(route);
    assert.match(html, /D THE DESIGNER/i, route);
    assert.match(html, /Design Technologist|Dreia Wilson/i, route);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i, route);
  }
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
