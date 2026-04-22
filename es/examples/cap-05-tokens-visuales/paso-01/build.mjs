import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const TOKENS_DIR = "./tokens";

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

const loadFlat = (name) => flatten(JSON.parse(readFileSync(join(TOKENS_DIR, name), "utf8")));

const primitive = loadFlat("primitive.json");
const semanticLight = loadFlat("semantic-light.json");
const semanticDark = loadFlat("semantic-dark.json");

function makeResolver(layered) {
  return function resolve(value, seen = new Set()) {
    if (typeof value !== "string") return value;
    return value.replace(/\{([^}]+)\}/g, (_, ref) => {
      if (seen.has(ref)) throw new Error(`Referencia circular en {${ref}}`);
      if (!(ref in layered)) throw new Error(`Token desconocido: {${ref}}`);
      return resolve(layered[ref], new Set([...seen, ref]));
    });
  };
}

const cssVarFor = (name) => "--" + name.replace(/\./g, "-");

function emit(layered, label) {
  const resolve = makeResolver(layered);
  const lines = [`/* ${label} */`, ":root {"];
  for (const [name, raw] of Object.entries(layered)) {
    lines.push(`  ${cssVarFor(name)}: ${resolve(raw)};`);
  }
  lines.push("}");
  return lines.join("\n") + "\n";
}

mkdirSync("./dist", { recursive: true });
writeFileSync("./dist/variables-light.css", emit({ ...primitive, ...semanticLight }, "LIGHT mode"));
writeFileSync("./dist/variables-dark.css", emit({ ...primitive, ...semanticDark }, "DARK mode"));
console.log(`Generados light y dark sobre ${Object.keys(primitive).length} primitivos.`);
