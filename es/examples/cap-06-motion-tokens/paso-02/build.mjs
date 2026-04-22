import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const tokens = JSON.parse(readFileSync("./tokens/primitive.json", "utf8"));

function parseDurationMs(value) {
  const match = /^(\d+(?:\.\d+)?)ms$/.exec(value);
  if (!match) throw new Error(`Duracion no valida: ${value}`);
  return Number(match[1]);
}

function parseCubicBezier(value) {
  const match = /^cubic-bezier\(\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\s*\)$/.exec(value);
  if (!match) throw new Error(`Curva no valida: ${value}`);
  return match.slice(1).map(Number);
}

function camelCase(parts) {
  return parts[0] + parts.slice(1).map(p => p.replace(/(^|-)([a-z])/g, (_, _d, c) => c.toUpperCase())).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

const dartLines = [
  "// Generado por build.mjs. No editar a mano.",
  "// Este archivo es la traduccion Dart de tokens/primitive.json.",
  "",
  "import 'package:flutter/animation.dart';",
  "",
  "class MotionTokens {",
  "  MotionTokens._();",
  "",
  "  // Duraciones",
];

for (const [name, value] of Object.entries(tokens.motion.duration)) {
  const ms = parseDurationMs(value.$value);
  const dartName = "duration" + name.charAt(0).toUpperCase() + name.slice(1);
  dartLines.push(`  static const Duration ${dartName} = Duration(milliseconds: ${ms});`);
}

dartLines.push("", "  // Easing curves");
for (const [name, value] of Object.entries(tokens.motion.ease)) {
  const [x1, y1, x2, y2] = parseCubicBezier(value.$value);
  const dartName = "ease" + name.split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  dartLines.push(`  static const Cubic ${dartName} = Cubic(${x1}, ${y1}, ${x2}, ${y2});`);
}

dartLines.push("}", "");

mkdirSync("./lib", { recursive: true });
writeFileSync("./lib/motion_tokens.dart", dartLines.join("\n"));
console.log(`Generado lib/motion_tokens.dart con ${Object.keys(tokens.motion.duration).length} duraciones y ${Object.keys(tokens.motion.ease).length} curvas.`);
