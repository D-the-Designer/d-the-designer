import assert from "node:assert/strict";
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
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i, route);
  }
});

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
});
