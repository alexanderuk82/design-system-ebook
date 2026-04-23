# ejemplo_14_06

**Capítulo 14: Codebase setup** · paso 06 · `packages/react/tsup.config.ts`

Configuración de tsup para el package `@ds/react`. Diez líneas que producen
bundle ESM, CJS y `.d.ts` en paralelo.

## Archivo

Vive en `paso-01/packages/react/tsup.config.ts` dentro del monorepo real:

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
});
```

## Por qué importa

tsup envuelve esbuild con defaults sensatos para librerías. Cero
configuración custom. La salida cubre los tres escenarios de consumo:

- **ESM** (`dist/index.js`), para apps modernas con bundlers que tree-shake.
- **CJS** (`dist/index.cjs`), para Node clásico y herramientas legacy.
- **DTS** (`dist/index.d.ts`), para que TypeScript inferencia tipos del
  package consumiendo.

`external: ['react', 'react-dom']` es la línea crítica. Sin ella, tu bundle
incluye React y la app que consume tu DS acaba con dos copias (la suya +
la tuya). Eso rompe hooks, dobla el tamaño, y produce bugs imposibles de
debuggear. Marcar React como external es no negociable en cualquier package
React de DS.

`clean: true` borra `dist/` antes de cada build. Evita que archivos viejos
sobrevivan después de renombrar exports.

## El package `@ds/tokens` tiene un tsup similar

Ver `paso-01/packages/tokens/tsup.config.ts`. Idéntico patrón sin `external`
porque tokens no depende de React.

## Cómo se ejecuta

```bash
cd ../paso-01
pnpm build      # turbo orquesta tokens primero, luego react
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "Build tooling"
- Monorepo completo: `paso-01/`
- Pipeline que orquesta: `paso-07` (turbo.json)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
