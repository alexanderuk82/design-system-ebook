import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const TOKENS_DIR = "./tokens";
const OUT_RESOLVED = "./dist/variables-resolved.css";
const OUT_REFERENCED = "./dist/variables-referenced.css";

const flat = {};

function walk(obj, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && "$value" in value) {
      flat[[...path, key].join(".")] = value.$value;
    } else if (value && typeof value === "object") {
      walk(value, [...path, key]);
    }
  }
}

for (const file of readdirSync(TOKENS_DIR)) {
  if (!file.endsWith(".json")) continue;
  walk(JSON.parse(readFileSync(join(TOKENS_DIR, file), "utf8")));
}

const cssVarFor = (name) => "--" + name.replace(/\./g, "-");

function resolveLiteral(value, seen = new Set()) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (seen.has(ref)) throw new Error(`Circular reference at {${ref}}`);
    if (!(ref in flat)) throw new Error(`Unknown token: {${ref}}`);
    return resolveLiteral(flat[ref], new Set([...seen, ref]));
  });
}

function asReference(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (!(ref in flat)) throw new Error(`Unknown token: {${ref}}`);
    return `var(${cssVarFor(ref)})`;
  });
}

const resolvedLines = [
  "/* RESOLVED mode. The chain is flattened at build time. Every",
  "   variable carries its literal value. Cheaper at runtime, less",
  "   flexible for dynamic overrides. */",
  ":root {",
];
const referencedLines = [
  "/* REFERENCED mode. The chain is preserved with var(). Change",
  "   --color-blue-500 at runtime and everything downstream updates",
  "   on its own. Cost: one indirection per lookup. */",
  ":root {",
];

for (const [name, raw] of Object.entries(flat)) {
  resolvedLines.push(`  ${cssVarFor(name)}: ${resolveLiteral(raw)};`);
  referencedLines.push(`  ${cssVarFor(name)}: ${asReference(raw)};`);
}
resolvedLines.push("}");
referencedLines.push("}");

mkdirSync("./dist", { recursive: true });
writeFileSync(OUT_RESOLVED, resolvedLines.join("\n") + "\n");
writeFileSync(OUT_REFERENCED, referencedLines.join("\n") + "\n");
console.log(`Generated ${OUT_RESOLVED} and ${OUT_REFERENCED} with ${Object.keys(flat).length} tokens.`);
