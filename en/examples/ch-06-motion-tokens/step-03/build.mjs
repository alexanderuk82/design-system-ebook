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
  "/* Primitive motion tokens */",
  ":root {",
];
for (const [name, value] of Object.entries(primitive)) {
  lines.push(`  ${cssVarFor(name)}: ${value};`);
}
lines.push("}", "");

lines.push("/* Automatic override when the user enables reduce motion in the OS.");
lines.push("   Any component that consumes these tokens inherits the change,");
lines.push("   no need to touch component code. */");
lines.push("@media (prefers-reduced-motion: reduce) {");
lines.push("  :root {");
for (const [name, value] of Object.entries(reduced)) {
  lines.push(`    ${cssVarFor(name)}: ${value};`);
}
lines.push("  }", "}", "");

lines.push("/* Manual override via class. Useful for an in-product toggle.");
lines.push("   See index.html: the 'Reduce animations' button adds .reduced to <html>. */");
lines.push("html.reduced {");
for (const [name, value] of Object.entries(reduced)) {
  lines.push(`  ${cssVarFor(name)}: ${value};`);
}
lines.push("}");

mkdirSync("./dist", { recursive: true });
writeFileSync(OUT_FILE, lines.join("\n") + "\n");
console.log(`Generated ${OUT_FILE} with ${Object.keys(primitive).length} base tokens + override.`);
