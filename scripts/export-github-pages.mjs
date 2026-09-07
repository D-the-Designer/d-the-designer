import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const pagesRoot = new URL("../github-pages/", import.meta.url);
const clientRoot = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL(`../dist/server/index.js?github-pages=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);

if (!worker || typeof worker.fetch !== "function") {
  throw new Error("The production build does not expose a Worker fetch handler");
}

await rm(pagesRoot, { recursive: true, force: true });
await mkdir(pagesRoot, { recursive: true });
await cp(clientRoot, pagesRoot, { recursive: true });

const routes = ["/", "/work", "/freebies", "/about", "/contact"];
const context = { waitUntil() {}, passThroughOnException() {} };
const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

for (const pathname of routes) {
  const response = await worker.fetch(
    new Request(`https://d-the-designer.com${pathname}`, {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  if (!response.ok) {
    throw new Error(`Could not prerender ${pathname}: HTTP ${response.status}`);
  }

  const destination = pathname === "/"
    ? new URL("index.html", pagesRoot)
    : new URL(`${pathname.slice(1)}/index.html`, pagesRoot);
  await mkdir(new URL(".", destination), { recursive: true });
  await writeFile(destination, await response.text());
}

await writeFile(new URL("CNAME", pagesRoot), "d-the-designer.com\n");
console.log(`Exported ${routes.length} routes to ${pagesRoot.pathname}`);
