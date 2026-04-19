#!/usr/bin/env python3
"""Populate the companion repo with 86 stub folders (43 SPA + 43 ENG).

Each folder gets a README.md explaining what the example will contain
once Fase B through E are done. Book-side links resolve immediately.
"""
from __future__ import annotations

from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Chapter metadata: (num, spa_slug, eng_slug, spa_title, eng_title, steps, summary)
CHAPTERS = [
    (1,  "que-es-un-ds",                    "what-is-a-ds",                    "Qué es un design system",             "What is a design system",              [1],              "tokens JSON de ejemplo mostrando un sistema mínimo"),
    (2,  "principios-y-caso-negocio",       "principles-and-business-case",    "Principios y caso de negocio",        "Principles and business case",         [1],              "calculadora de ROI del DS con métricas del capítulo"),
    (4,  "teoria-tokens",                   "token-theory",                    "Teoría de tokens",                    "Token theory",                         [1, 2],           "tokens W3C en tres tiers + pipeline Style Dictionary"),
    (5,  "tokens-visuales",                 "visual-tokens",                   "Tokens visuales",                     "Visual tokens",                        [1, 2],           "paleta OKLCH completa + escalas spacing/radius/typography"),
    (6,  "motion-tokens",                   "motion-tokens",                   "Motion tokens",                       "Motion tokens",                        [1, 2, 3],        "duration + easing tokens, curva custom, prefers-reduced-motion"),
    (7,  "multi-plataforma-y-sync",         "multi-platform-and-sync",         "Multi-plataforma y sync",             "Multi-platform and sync",              [1, 2],           "Style Dictionary config + 4 outputs (CSS, Swift, Kotlin, Dart)"),
    (9,  "construyendo-componentes",        "building-components",             "Construyendo componentes",            "Building components",                  [1, 3, 4, 5, 6, 7, 8], "React+TS de Button, Input, Select, Card, Modal, Navigation, FormField, con tests"),
    (10, "accesibilidad",                   "accessibility",                   "Accesibilidad",                       "Accessibility",                        [1],              "Modal accesible con focus trap + axe tests"),
    (12, "handoff-ds-sync",                 "handoff-ds-sync",                 "Handoff DS Sync",                     "Handoff DS Sync",                      [3],              "pipeline Figma → GitHub completo, paso 3 del flujo de 8"),
    (13, "storybook",                       "storybook",                       "Storybook",                           "Storybook",                            [1],              "setup de Storybook para monorepo + MDX de Button story"),
    (14, "codebase-setup",                  "codebase-setup",                  "Codebase setup",                      "Codebase setup",                       [1, 2, 3, 4, 5, 6, 7], "monorepo pnpm + tsconfig + ESLint + Vite, cada paso añade una capa"),
    (15, "codificando-componentes",         "coding-components",               "Codificando componentes",             "Coding components",                    [1, 2, 3, 4, 5, 6],    "Button, Input, Select completos con variantes, theming, CSS variables"),
    (16, "testing",                         "testing",                         "Testing",                             "Testing",                              [1, 2, 3, 4, 5],       "unit (Vitest), visual (Chromatic), a11y (axe), setup CI"),
    (19, "gestion-cambio",                  "change-management",               "Gestión del cambio",                  "Change management",                    [1, 2],           "changeset de breaking change + codemod para rename de prop"),
    (20, "multi-marca",                     "multi-brand",                     "Multi-marca",                         "Multi-brand",                          [1, 2],           "theming multibrand con semantic tokens + brand override"),
]


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def stub_es(num: int, slug: str, title: str, step: int, summary: str) -> str:
    tag = f"ejemplo_{num:02d}_{step:02d}"
    return f"""# {tag}

**Capítulo {num}: {title}** · paso {step:02d}

## Qué contendrá

{summary}

## Estado

> Código completo en preparación.

Esta carpeta es el destino del tag `{tag}` referenciado en el Capítulo {num} del libro Design System V.1.0. El código ejecutable se publicará en una release posterior del repo. Por ahora el link del libro resuelve aquí para que el lector sepa dónde aterrizará el ejemplo.

## Volver al libro

- Edición español: `SPA/02-tokens/` a `SPA/07-avanzado/` según el capítulo
- Este repo cubre las 15 partes del libro que incluyen código

## Licencia

MIT. Ver [LICENSE](../../../LICENSE) en la raíz del repo.
"""


def stub_en(num: int, slug: str, title: str, step: int, summary: str) -> str:
    tag = f"example_{num:02d}_{step:02d}"
    return f"""# {tag}

**Chapter {num}: {title}** · step {step:02d}

## What this will contain

{summary}

## Status

> Complete code in preparation.

This folder is the destination of the `{tag}` tag referenced in Chapter {num} of the Design System V.1.0 ebook. Runnable code will ship in a later release of this repo. For now the book link resolves here so readers know where the example will land.

## Back to the book

- English edition: `ENG/02-tokens/` through `ENG/07-advanced/` depending on the chapter
- This repo covers the 15 parts of the book that include code

## Licence

MIT. See [LICENSE](../../../LICENSE) at the repo root.
"""


def main() -> int:
    total = 0
    for num, spa_slug, eng_slug, spa_title, eng_title, steps, summary in CHAPTERS:
        for step in steps:
            es_path = REPO_ROOT / "es" / "examples" / f"cap-{num:02d}-{spa_slug}" / f"paso-{step:02d}" / "README.md"
            en_path = REPO_ROOT / "en" / "examples" / f"ch-{num:02d}-{eng_slug}" / f"step-{step:02d}" / "README.md"
            write_file(es_path, stub_es(num, spa_slug, spa_title, step, summary))
            write_file(en_path, stub_en(num, eng_slug, eng_title, step, summary))
            total += 2

    print(f"Wrote {total} stub folders ({total // 2} per language).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
