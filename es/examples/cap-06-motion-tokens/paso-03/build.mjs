import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const TOKENS_DIR = "./tokens";
const OUT_FILE = "./dist/variables.css";

function flatten(obj, path = [], target = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && "$value" in value) {
      target[[...path, key].join(".")] = value.$value;
    } else if (value && typeof value === "object") {
      flatten(value, [...path, key], target);
    }
  }
  return target;
}

const primitive = flatten(JSON.parse(readFileSync(`${TOKENS_DIR}/primitive.json`, "utf8")));
const reduced = flatten(JSON.parse(readFileSync(`${TOKENS_DIR}/reduced.json`, "utf8")));

const cssVarFor = (name) => "--" + name.replace(/\./g, "-");

const lines = [
  "/* Motion tokens primitivos */",
  ":root {",
];
for (const [name, value] of Object.entries(primitive)) {
  lines.push(`  ${cssVarFor(name)}: ${value};`);
}
lines.push("}", "");

lines.push("/* Override automatico cuando el usuario activa reduce motion en el OS.");
lines.push("   Cualquier componente que consuma estos tokens hereda el cambio,");
lines.push("   sin necesidad de tocar codigo de componentes. */");
lines.push("@media (prefers-reduced-motion: reduce) {");
lines.push("  :root {");
for (const [name, value] of Object.entries(reduced)) {
  lines.push(`    ${cssVarFor(name)}: ${value};`);
}
lines.push("  }", "}", "");

lines.push("/* Override manual via clase. Util para un toggle dentro del producto.");
lines.push("   Ver index.html: el boton 'Reducir animaciones' anade .reduced al <html>. */");
lines.push("html.reduced {");
for (const [name, value] of Object.entries(reduced)) {
  lines.push(`  ${cssVarFor(name)}: ${value};`);
}
lines.push("}");

mkdirSync("./dist", { recursive: true });
writeFileSync(OUT_FILE, lines.join("\n") + "\n");
console.log(`Generado ${OUT_FILE} con ${Object.keys(primitive).length} tokens base + override.`);
