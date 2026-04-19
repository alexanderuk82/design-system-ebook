# Design System V.1.0 · Companion repo

> Complete runnable code examples for the **Design System V.1.0** ebook by Alexander Burgos.
> Código ejecutable completo para el libro **Design System V.1.0** de Alexander Burgos.

Bilingual repo (English + Español) mirroring the 15 chapters of the book that include code. Every `example_NN_NN` tag in the book resolves to a folder here.

---

## 🇬🇧 English

### What this repo is

This is the **companion code repo** for the *Design System V.1.0* ebook. The book is visual-first and conceptual-heavy. Snippets in the book stay under 20 lines each. Full, runnable implementations live here.

Each folder matches a `example_NN_NN` tag in the book:

```
en/examples/ch-04-token-theory/step-01/   →  referenced as example_04_01 in Chapter 4
en/examples/ch-14-codebase-setup/step-03/ →  referenced as example_14_03 in Chapter 14
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
| B | Chapters 1, 2, 4, 5, 6, 7 (tokens) | ⏳ pending |
| C | Chapters 9, 10, 12 (components) | ⏳ pending |
| D | Chapters 13, 14, 15, 16 (implementation) | ⏳ pending |
| E | Chapters 19, 20 (advanced) | ⏳ pending |
| F | CI, Storybook deploy, package publishing | ⏳ pending |

Follow releases on [GitHub](https://github.com/alexanderuk82/design-system-ebook/releases) to see when each phase ships.

### Run the examples

Each folder will get its own `package.json` and run instructions once Phase B lands. The root repo will be a `pnpm` monorepo so you can run everything from the top:

```bash
pnpm install
pnpm --filter ch-14-codebase-setup-step-01 dev
```

For now, every folder contains a `README.md` describing what the example will demonstrate and linking back to the relevant book chapter.

### License

MIT. See [LICENSE](./LICENSE).

---

## 🇪🇸 Español

### Qué es este repo

Este es el **repositorio companion** del libro *Design System V.1.0*. El libro es visual y conceptual. Los fragmentos en el libro no pasan de 20 líneas cada uno. Las implementaciones completas y ejecutables viven aquí.

Cada carpeta corresponde a un tag `ejemplo_NN_NN` del libro:

```
es/examples/cap-04-teoria-tokens/paso-01/   →  referenciado como ejemplo_04_01 en el Capítulo 4
es/examples/cap-14-codebase-setup/paso-03/  →  referenciado como ejemplo_14_03 en el Capítulo 14
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
| B | Capítulos 1, 2, 4, 5, 6, 7 (tokens) | ⏳ pendiente |
| C | Capítulos 9, 10, 12 (componentes) | ⏳ pendiente |
| D | Capítulos 13, 14, 15, 16 (implementación) | ⏳ pendiente |
| E | Capítulos 19, 20 (avanzado) | ⏳ pendiente |
| F | CI, deploy Storybook, publicar packages | ⏳ pendiente |

Sigue las releases en [GitHub](https://github.com/alexanderuk82/design-system-ebook/releases) para ver cuándo sale cada fase.

### Correr los ejemplos

Cada carpeta tendrá su propio `package.json` e instrucciones cuando aterrice la Fase B. El repo raíz será un monorepo `pnpm` para poder correr todo desde arriba:

```bash
pnpm install
pnpm --filter cap-14-codebase-setup-paso-01 dev
```

Por ahora, cada carpeta contiene un `README.md` que describe qué va a demostrar el ejemplo y enlaza al capítulo correspondiente del libro.

### Licencia

MIT. Ver [LICENSE](./LICENSE).

---

## Author

**Alexander Burgos** · Senior UX Engineer · Author of Design System V.1.0.

- Website: [alexanderburgos.netlify.app](https://alexanderburgos.netlify.app/)
- LinkedIn: [alexandersstudio](https://linkedin.com/in/alexandersstudio/)
- Figma: [@alexandersstudi](https://www.figma.com/@alexandersstudi)
- Plugin DS Sync: the handoff tool featured in Chapter 12
