// Convierte el JSON exportado por DS Sync (Figma) a CSS variables con
// soporte de modes (light por defecto, dark via prefers-color-scheme).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const INPUT = "./tokens-from-figma.json";
const OUTPUT = "./dist/tokens.css";

const tokens = JSON.parse(readFileSync(INPUT, "utf8"));

// Aplana el arbol del JSON. Devuelve dos diccionarios:
// - flat: tokens con valor unico (primitivos o semantic single mode)
// - modes: tokens con valor por mode { light: "...", dark: "..." }
function flatten(obj, path = [], flat = {}, modes = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const fullPath = [...path, key].join(".");
    if (value && typeof value === "object" && "$value" in value) {
      const v = value.$value;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        modes[fullPath] = v;
      } else {
        flat[fullPath] = v;
      }
    } else if (value && typeof value === "object") {
      flatten(value, [...path, key], flat, modes);
    }
  }
  return { flat, modes };
}

const { flat, modes } = flatten(tokens);

function resolveLiteral(value, seen = new Set()) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (seen.has(ref)) throw new Error(`Referencia circular en {${ref}}`);
    if (!(ref in flat)) throw new Error(`Token desconocido: {${ref}}`);
    return resolveLiteral(flat[ref], new Set([...seen, ref]));
  });
}

const cssVarFor = (name) => "--" + name.replace(/\./g, "-");

const lines = [
  "/* Generado por build.mjs desde tokens-from-figma.json (export DS Sync) */",
  "",
  "/* Light mode (default) */",
  ":root {",
];

// Primitivos planos
for (const [name, value] of Object.entries(flat)) {
  lines.push(`  ${cssVarFor(name)}: ${resolveLiteral(value)};`);
}
// Semantic en modo light
for (const [name, byMode] of Object.entries(modes)) {
  if (byMode.light) {
    lines.push(`  ${cssVarFor(name)}: ${resolveLiteral(byMode.light)};`);
  }
}
lines.push("}", "");

lines.push("/* Dark mode (preferencia del OS) */");
lines.push("@media (prefers-color-scheme: dark) {");
lines.push("  :root {");
for (const [name, byMode] of Object.entries(modes)) {
  if (byMode.dark) {
    lines.push(`    ${cssVarFor(name)}: ${resolveLiteral(byMode.dark)};`);
  }
}
lines.push("  }", "}", "");

lines.push("/* Dark mode (override manual via clase, util para toggle interno) */");
lines.push("[data-theme=\"dark\"] {");
for (const [name, byMode] of Object.entries(modes)) {
  if (byMode.dark) {
    lines.push(`  ${cssVarFor(name)}: ${resolveLiteral(byMode.dark)};`);
  }
}
lines.push("}");

mkdirSync("./dist", { recursive: true });
writeFileSync(OUTPUT, lines.join("\n") + "\n");
console.log(`Generado ${OUTPUT} con ${Object.keys(flat).length} primitivos y ${Object.keys(modes).length} semantic con modes.`);
