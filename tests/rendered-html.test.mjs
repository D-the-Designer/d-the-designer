import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the specimen design system", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Specimen 7-B — Product \+ Merch System<\/title>/i);
  assert.match(html, /Turn a creature into a brand/i);
  assert.match(html, /Short, visible rules keep the board readable/i);
  assert.match(html, /Sort, then refine/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships the reference imagery with the design system", async () => {
  await access(new URL("public/reference/hero-board.png", templateRoot));
  await access(new URL("public/reference/keep-board.png", templateRoot));
  await access(new URL("public/og.png", templateRoot));
});
