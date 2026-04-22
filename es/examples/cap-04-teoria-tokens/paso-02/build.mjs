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
    if (seen.has(ref)) throw new Error(`Referencia circular en {${ref}}`);
    if (!(ref in flat)) throw new Error(`Token desconocido: {${ref}}`);
    return resolveLiteral(flat[ref], new Set([...seen, ref]));
  });
}

function asReference(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (!(ref in flat)) throw new Error(`Token desconocido: {${ref}}`);
    return `var(${cssVarFor(ref)})`;
  });
}

const resolvedLines = [
  "/* Modo RESUELTO. La cadena se aplana al build. Cada variable",
  "   tiene su valor literal. Mas rendimiento en runtime, menos",
  "   flexibilidad para overrides dinamicos. */",
  ":root {",
];
const referencedLines = [
  "/* Modo REFERENCIADO. La cadena se preserva con var().",
  "   Cambias --color-blue-500 en runtime y todo lo que cuelga",
  "   se actualiza solo. Coste: una indireccion por lookup. */",
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
console.log(`Generados ${OUT_RESOLVED} y ${OUT_REFERENCED} con ${Object.keys(flat).length} tokens.`);
