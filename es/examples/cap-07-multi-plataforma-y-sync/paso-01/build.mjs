import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const tokens = JSON.parse(readFileSync("./tokens/colors.json", "utf8"));

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

function hexToRgb(hex) {
  const v = hex.replace(/^#/, "");
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

const flat = flatten(tokens);
const camel = (parts) => parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");

mkdirSync("./build/css", { recursive: true });
mkdirSync("./build/ios", { recursive: true });
mkdirSync("./build/android", { recursive: true });
mkdirSync("./build/flutter", { recursive: true });

// 1. CSS
{
  const lines = ["/* Generado por build.mjs */", ":root {"];
  for (const [name, value] of Object.entries(flat)) {
    lines.push(`  --${name.replace(/\./g, "-")}: ${value};`);
  }
  lines.push("}");
  writeFileSync("./build/css/tokens.css", lines.join("\n") + "\n");
}

// 2. Swift
{
  const lines = [
    "// Generado por build.mjs",
    "import SwiftUI",
    "",
    "extension Color {",
  ];
  for (const [name, value] of Object.entries(flat)) {
    const { r, g, b } = hexToRgb(value);
    const swiftName = camel(name.split("."));
    lines.push(`  static let ${swiftName} = Color(`);
    lines.push(`    red: ${(r/255).toFixed(3)},`);
    lines.push(`    green: ${(g/255).toFixed(3)},`);
    lines.push(`    blue: ${(b/255).toFixed(3)}`);
    lines.push(`  )`);
  }
  lines.push("}", "");
  writeFileSync("./build/ios/Tokens.swift", lines.join("\n"));
}

// 3. Kotlin Compose
{
  const lines = [
    "// Generado por build.mjs",
    "package com.miempresa.ds",
    "",
    "import androidx.compose.ui.graphics.Color",
    "",
    "object Tokens {",
  ];
  for (const [name, value] of Object.entries(flat)) {
    const argb = "0xFF" + value.replace(/^#/, "").toUpperCase();
    const ktName = camel(name.split("."));
    lines.push(`  val ${ktName} = Color(${argb})`);
  }
  lines.push("}", "");
  writeFileSync("./build/android/Tokens.kt", lines.join("\n"));
}

// 4. Flutter Dart
{
  const lines = [
    "// Generado por build.mjs",
    "import 'package:flutter/material.dart';",
    "",
    "class Tokens {",
    "  Tokens._();",
  ];
  for (const [name, value] of Object.entries(flat)) {
    const argb = "0xFF" + value.replace(/^#/, "").toUpperCase();
    const dartName = camel(name.split("."));
    lines.push(`  static const Color ${dartName} = Color(${argb});`);
  }
  lines.push("}", "");
  writeFileSync("./build/flutter/tokens.dart", lines.join("\n"));
}

console.log(`Generados 4 outputs en build/ desde ${Object.keys(flat).length} tokens.`);
