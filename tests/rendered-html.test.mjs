import assert from "node:assert/strict";
<<<<<<< HEAD
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
=======
import { access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  const request = new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } });
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };
  return typeof worker.fetch === "function" ? worker.fetch(request, env, context) : worker(request, env, context);
}

const routes = ["/", "/work", "/freebies", "/about", "/contact"];

test("server-renders every portfolio route", async () => {
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /D THE DESIGNER/i, route);
>>>>>>> github/main
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i, route);
  }
});

<<<<<<< HEAD
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

test("ships the supplied headshot asset", async () => {
  await access(new URL("public/headshot.jpg", new URL("../", import.meta.url)));
=======
test("renders the handoff's primary content and review flags", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /Design \+ AI systems for creative teams building with generative tools/i);
  assert.match(home, /Structure that survives contact with real work/i);
  assert.doesNotMatch(home, /Drop hero image/i);

  const freebies = await (await render("/freebies")).text();
  assert.match(freebies, /Retro Futura/i);
  assert.match(freebies, /Skill Stack Builder/i);
  assert.match(freebies, /share the same GPT URL/i);
});

test("ships the supplied headshot asset", async () => {
  await access(new URL("public/headshot.jpg", root));
>>>>>>> github/main
});
