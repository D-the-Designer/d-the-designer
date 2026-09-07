import { readFile, writeFile } from "node:fs/promises";

const entryPath = new URL("../dist/server/index.js", import.meta.url);
const moduleUrl = `${entryPath.href}?worker-shape=${Date.now()}`;
const { default: worker } = await import(moduleUrl);

if (worker && typeof worker.fetch === "function") {
  process.exit(0);
}

if (typeof worker !== "function") {
  throw new Error("The built Worker entry does not export a callable default handler");
}

const source = await readFile(entryPath, "utf8");
const exportStart = source.lastIndexOf("export{");
const exportEnd = source.indexOf("};", exportStart);
if (exportStart < 0 || exportEnd < 0) {
  throw new Error("Unable to locate the built Worker export list");
}

const exportList = source.slice(exportStart, exportEnd + 2);
const defaultBinding = exportList.match(/([A-Za-z_$][\w$]*) as default/);
if (!defaultBinding) {
  throw new Error("Unable to locate the built Worker default export");
}

const wrappedExport = exportList.replace(
  `${defaultBinding[1]} as default`,
  "__sitesWorker as default",
);
const updated = `${source.slice(0, exportStart)}const __sitesWorker={fetch:${defaultBinding[1]}};${wrappedExport}${source.slice(exportEnd + 2)}`;
await writeFile(entryPath, updated);
