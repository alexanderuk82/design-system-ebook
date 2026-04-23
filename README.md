# Design System V.1.0 · Companion repo

> Complete runnable code examples for the **Design System V.1.0** ebook by Alexander Burgos.
> Código ejecutable completo para el libro **Design System V.1.0** de Alexander Burgos.

Bilingual repo (English + Español) mirroring the 15 chapters of the book that include code. Every `example_NN_NN` tag in the book resolves to a folder here.

---

## 🇬🇧 English

### What this repo is

This is the **companion code repo** for the *Design System V.1.0* ebook. The book is visual-first and conceptual-heavy. Snippets in the book stay under 20 lines each. Full, runnable implementations live here.

Each folder matches an `example_NN_NN` tag in the book:

```
en/examples/ch-04-token-theory/step-01/   →  referenced as example_04_01 in Chapter 4
en/examples/ch-09-building-components/step-04/ →  referenced as example_09_04 in Chapter 9
```

### Coverage

| Chapters with code | Steps per chapter |
| --- | --- |
| 1, 2, 10, 12, 13 | 1 each (5 total) |
| 4, 5, 7, 19, 20 | 2 each (10 total) |
| 6 | 3 (3 total) |
| 16 | 5 (5 total) |
| 15 | 6 (6 total) |
| 9, 14 | 7 each (14 total) |
| **Total** | **43 examples per language** |

### Status

| Phase | Scope | Status |
| --- | --- | --- |
| A | 86 stub folders so book links resolve | ✅ done |
| B | Chapters 1, 2, 4, 5, 6, 7 (tokens) | ✅ done |
| C | Chapters 9, 10, 12 (components) | ✅ done |
| D | Chapters 13, 14, 15, 16 (implementation) | ✅ done |
| E | Chapters 19, 20 (advanced) | ✅ done |
| F | CI, Storybook deploy, package publishing | ⏳ pending |

**Shipped**: all 43 examples × 2 languages = 86 folders. Every `example_NN_NN` tag in the book resolves to code you can run. Phase E closes the loop with a runnable `@changesets/cli` demo, a real jscodeshift codemod for a prop rename, and two multi-brand HTML examples (static three-brand grid + runtime brand switcher). Follow releases on [GitHub](https://github.com/alexanderuk82/design-system-ebook/releases).

### How the examples are organised

The companion repo has three flavours of example, each one optimised for the lowest-friction reading experience:

**1. Token examples (Fase B, chapters 1 to 7).** Each folder ships `tokens/*.json`, a small homemade `build.mjs` that resolves W3C tokens and emits CSS, an `index.html` consuming the result, and a precompiled `dist/`. Just open `index.html` in any modern browser, no install needed. The Style Dictionary example (`ch-07-multi-platform-and-sync/step-02`) is the only one that requires `npm install`.

**2. Component examples (Fase C, chapter 9 most folders, plus chapter 12 step-03).** Each folder ships an `index.html` that loads React from a CDN (UMD or esm.sh via importmap when Radix is involved) and compiles the TSX in the browser with Babel standalone. Open the HTML and the component renders. No bundler, no `node_modules`. Components included: Button, Input, Select (Radix), Card (compositional), Modal (Radix), Navigation.

**3. Test examples (chapter 9 step-08, chapter 10 step-01, chapter 16 step-01 and step-04).** Real Vitest + `@testing-library/react` projects, with `jest-axe` on the older ones and `vitest-axe` on chapter 16. These need `npm install && npm test`. They demonstrate the accessibility test patterns the book recommends (`expectNoA11yViolations` helper applied to multiple components, plus a meta-test that verifies the helper actually catches real violations).

**4. Full project examples (Fase D).** Bigger, self-contained projects with their own `package.json`: the pnpm + Turborepo monorepo in chapter 14 step-01, the Vite React app with polymorphic Button in chapter 15 step-01, and the Storybook 8 setup in chapter 13 step-01. Each one is `npm install && npm run <build/dev/typecheck>` away from running. The smaller steps inside those chapters are documented extracts of the real files, so you can read them without cloning the whole project.

### Run the examples

For the visual examples (most of the repo so far):

```bash
# Just open the HTML
start en/examples/ch-09-building-components/step-04/index.html
```

For the test examples:

```bash
cd en/examples/ch-09-building-components/step-08
npm install
npm test
```

For the Style Dictionary example:

```bash
cd en/examples/ch-07-multi-platform-and-sync/step-02
npm install
npm run build   # emits CSS, Swift, Kotlin, Dart from one JSON
```

Each folder remains self-contained with its own README so you can jump straight to the chapter you are reading without running anything else.

### License

MIT. See [LICENSE](./LICENSE).

---

## 🇪🇸 Español

### Qué es este repo

Este es el **repositorio companion** del libro *Design System V.1.0*. El libro es visual y conceptual. Los fragmentos en el libro no pasan de 20 líneas cada uno. Las implementaciones completas y ejecutables viven aquí.

Cada carpeta corresponde a un tag `ejemplo_NN_NN` del libro:

```
es/examples/cap-04-teoria-tokens/paso-01/   →  referenciado como ejemplo_04_01 en el Capítulo 4
es/examples/cap-09-construyendo-componentes/paso-04/ →  referenciado como ejemplo_09_04 en el Capítulo 9
```

### Cobertura

| Capítulos con código | Pasos por capítulo |
| --- | --- |
| 1, 2, 10, 12, 13 | 1 cada uno (5 total) |
| 4, 5, 7, 19, 20 | 2 cada uno (10 total) |
| 6 | 3 (3 total) |
| 16 | 5 (5 total) |
| 15 | 6 (6 total) |
| 9, 14 | 7 cada uno (14 total) |
| **Total** | **43 ejemplos por idioma** |

### Estado

| Fase | Alcance | Estado |
| --- | --- | --- |
| A | 86 carpetas stub para que los links del libro resuelvan | ✅ listo |
| B | Capítulos 1, 2, 4, 5, 6, 7 (tokens) | ✅ listo |
| C | Capítulos 9, 10, 12 (componentes) | ✅ listo |
| D | Capítulos 13, 14, 15, 16 (implementación) | ✅ listo |
| E | Capítulos 19, 20 (avanzado) | ✅ listo |
| F | CI, deploy Storybook, publicar packages | ⏳ pendiente |

**Enviado**: los 43 ejemplos × 2 idiomas = 86 carpetas. Cada tag `ejemplo_NN_NN` del libro resuelve a código ejecutable. La Fase E cierra el círculo con una demo runnable de `@changesets/cli`, un codemod jscodeshift real para rename de prop, y dos ejemplos HTML multi-marca (grid estático de tres marcas + switcher runtime). Sigue las releases en [GitHub](https://github.com/alexanderuk82/design-system-ebook/releases).

### Cómo están organizados los ejemplos

El repo companion tiene tres sabores de ejemplo, cada uno pensado para la mínima fricción de lectura:

**1. Ejemplos de tokens (Fase B, capítulos 1 al 7).** Cada carpeta trae `tokens/*.json`, un `build.mjs` casero que resuelve W3C tokens y emite CSS, un `index.html` que consume el resultado, y un `dist/` precompilado. Abre `index.html` en cualquier navegador moderno, no hace falta instalar nada. El ejemplo de Style Dictionary (`cap-07-multi-plataforma-y-sync/paso-02`) es el único que requiere `npm install`.

**2. Ejemplos de componentes (Fase C, casi todo el capítulo 9 más cap 12 paso-03).** Cada carpeta trae un `index.html` que carga React desde un CDN (UMD o esm.sh vía importmap cuando hay Radix) y compila el TSX en el navegador con Babel standalone. Abres el HTML y el componente renderiza. Sin bundler, sin `node_modules`. Componentes incluidos: Button, Input, Select (Radix), Card (compositivo), Modal (Radix), Navigation.

**3. Ejemplos de tests (capítulo 9 paso-08, capítulo 10 paso-01, capítulo 16 paso-01 y paso-04).** Proyectos Vitest + `@testing-library/react` reales, con `jest-axe` en los antiguos y `vitest-axe` en el capítulo 16. Estos sí necesitan `npm install && npm test`. Demuestran los patrones de test de accesibilidad que el libro recomienda (helper `expectNoA11yViolations` aplicado a varios componentes, más un meta-test que verifica que el helper realmente detecta violaciones reales).

**4. Ejemplos de proyecto completo (Fase D).** Proyectos auto-contenidos con su propio `package.json`: el monorepo pnpm + Turborepo del capítulo 14 paso-01, la app Vite React con Button polimórfico del capítulo 15 paso-01, y el Storybook 8 del capítulo 13 paso-01. Cada uno está a un `npm install && npm run <build/dev/typecheck>` de correr. Los pasos más pequeños dentro de esos capítulos son extractos documentados de los archivos reales, para que puedas leerlos sin clonar el proyecto entero.

### Correr los ejemplos

Para los ejemplos visuales (la mayoría del repo por ahora):

```bash
# Solo abre el HTML
start es/examples/cap-09-construyendo-componentes/paso-04/index.html
```

Para los ejemplos con tests:

```bash
cd es/examples/cap-09-construyendo-componentes/paso-08
npm install
npm test
```

Para el ejemplo de Style Dictionary:

```bash
cd es/examples/cap-07-multi-plataforma-y-sync/paso-02
npm install
npm run build   # emite CSS, Swift, Kotlin, Dart desde un solo JSON
```

Cada carpeta sigue siendo auto-contenida con su propio README, así puedes saltar directamente al capítulo que estás leyendo sin correr nada más.

### Licencia

MIT. Ver [LICENSE](./LICENSE).

---

## Author

**Alexander Burgos** · Senior UX Engineer · Author of Design System V.1.0.

- Website: [alexanderburgos.netlify.app](https://alexanderburgos.netlify.app/)
- LinkedIn: [alexandersstudio](https://linkedin.com/in/alexandersstudio/)
- Figma: [@alexandersstudi](https://www.figma.com/@alexandersstudi)
- Plugin DS Sync: the handoff tool featured in Chapter 12
