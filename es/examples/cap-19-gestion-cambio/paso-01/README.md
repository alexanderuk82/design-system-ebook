# ejemplo_19_01

**Capítulo 19: Gestión de cambio** · paso 01 (changesets runnable)

Mini setup con `@changesets/cli` + un fake package `@ds/react` + el changeset
exacto del libro. Corre `npm install && npm run version` y changesets genera
un `CHANGELOG.md` real y bumpea la versión del package de 2.2.0 a 3.0.0
(porque el changeset declara `major`).

## Cómo correrlo

```bash
cd es/examples/cap-19-gestion-cambio/paso-01
npm install
npm run version
```

Después de `version`:

- `packages/react/package.json` salta a `"version": "3.0.0"`.
- Se crea `packages/react/CHANGELOG.md` con una entrada `## 3.0.0` que
  contiene el texto del changeset.
- El archivo `.changeset/renamed-button-variant-prop.md` se elimina
  (changesets lo consume al bumpear).

Si quieres volver al estado inicial, `git checkout -- .` antes de volver a
experimentar.

## El archivo que importa

```
.changeset/
  renamed-button-variant-prop.md  ← ejemplo_19_01 literal, copiado del libro
  config.json                     ← config de changesets, generada por init
  README.md                       ← instrucciones para devs
```

El contenido del changeset es tres líneas efectivas:

```md
---
"@ds/react": major
---

Renombrado Button.intent a Button.variant...
```

El frontmatter declara qué package y qué tipo de bump (major). El cuerpo es
la entrada de changelog que verá el lector final.

## Probar el flujo completo de un PR

Con `npm` o `pnpm` instalado, el flujo real se reproduce así:

1. **Editar código del package.** Simula una breaking change: añade una
   línea a `packages/react/src/index.ts`.
2. **Crear un changeset nuevo.** `npm run changeset`. El CLI pregunta, tú
   respondes, genera un segundo archivo en `.changeset/`.
3. **Commit del código + changeset.** En un repo real esto sería el PR.
4. **Publicar.** `npm run version` bumpea versiones y regenera changelog;
   `npm run publish` lo sube a npm (aquí salta porque `private: true`).

## Cosas que vale la pena tocar

- Cambia el tipo de bump en el frontmatter a `minor` y corre `version` de
  nuevo. La versión salta a 2.3.0 en lugar de 3.0.0. Ese cambio de una
  palabra es la diferencia entre "los consumers migran" y "los consumers
  actualizan sin mirar".
- Crea un segundo package dummy (`@ds/tokens`) y un changeset que afecte a
  los dos. Verás que changesets bumpea ambos respetando el tipo por
  package.

## Volver al libro

- Texto fuente: `SPA/06-governance/cap-19-gestion-cambio.md`, sección
  "Changesets, el pegamento del changelog"
- Cap relacionado: `cap-19-gestion-cambio/paso-02` (codemod que acompaña a
  esta breaking change)
- Cap relacionado: `cap-14-codebase-setup/paso-01` (monorepo donde encaja
  todo esto en producción)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
