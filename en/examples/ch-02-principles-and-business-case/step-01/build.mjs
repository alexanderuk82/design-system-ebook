import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const TOKENS_DIR = "./tokens";
const OUT_FILE = "./dist/variables.css";

const flat = {};
const descriptions = {};

function walk(obj, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && "$value" in value) {
      const name = [...path, key].join(".");
      flat[name] = value.$value;
      if (value.$description) descriptions[name] = value.$description;
    } else if (value && typeof value === "object") {
      walk(value, [...path, key]);
    }
  }
}

for (const file of readdirSync(TOKENS_DIR)) {
  if (!file.endsWith(".json")) continue;
  const data = JSON.parse(readFileSync(join(TOKENS_DIR, file), "utf8"));
  walk(data);
}

function resolve(value, seen = new Set()) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (seen.has(ref)) throw new Error(`Circular reference at {${ref}}`);
    if (!(ref in flat)) throw new Error(`Unknown token: {${ref}}`);
    return resolve(flat[ref], new Set([...seen, ref]));
  });
}

const lines = [":root {"];
for (const [name, raw] of Object.entries(flat)) {
  const cssName = "--" + name.replace(/\./g, "-");
  if (descriptions[name]) {
    lines.push(`  /* ${descriptions[name]} */`);
  }
  lines.push(`  ${cssName}: ${resolve(raw)};`);
  lines.push("");
}
if (lines[lines.length - 1] === "") lines.pop();
lines.push("}");

mkdirSync("./dist", { recursive: true });
writeFileSync(OUT_FILE, lines.join("\n") + "\n");
console.log(`Generated ${OUT_FILE} with ${Object.keys(flat).length} tokens.`);
