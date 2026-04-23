# ejemplo_15_03

**Capítulo 15: Codificando componentes** · paso 03 · estructura del componente

La convención de archivos por componente del Cap 15: todo lo relacionado con
Button vive junto en una carpeta propia.

## Estructura

Dentro de `paso-01/src/Button/`:

```
src/Button/
├── Button.tsx              # implementacion TSX
├── Button.module.css       # CSS Modules scoped
├── index.ts                # barrel export
```

En un DS completo, la misma carpeta tambien contendria:

```
├── Button.stories.mdx      # cap 13
├── Button.test.tsx         # cap 16
└── Button.a11y.tsx         # tests axe especificos
```

## Por qué importa

La convención "un archivo por componente" de la vieja escuela no aguanta
cuando el componente tiene stories, tests y a11y checks. Agrupar por
carpeta escala. Dentro de la carpeta, los nombres se repiten (`Button.*`)
para que el navegador de archivos ordene alfabéticamente por tipo, no por
componente.

El `index.ts` permite `import { Button } from './Button'` (la carpeta) en
vez de `./Button/Button`. Oculta el detalle interno y libera la opción de
partir el archivo en el futuro sin tocar los consumers.

## Cómo correrlo

```bash
cd ../paso-01
npm install
npm run dev
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`, sección "Estructura interna de un componente del DS"
- App completa: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
