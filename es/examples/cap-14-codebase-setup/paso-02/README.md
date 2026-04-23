# ejemplo_14_02

**Capítulo 14: Codebase setup** · paso 02 · `tsconfig.base.json`

Config TypeScript compartida en el root del monorepo. Cada package extiende
esta base y solo declara lo específico (outDir, rootDir, includes).

## Archivo

Vive en `paso-01/tsconfig.base.json` dentro del monorepo real:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  }
}
```

## Por qué importa

Una sola configuración gobierna el tipado del monorepo entero. Cuando mañana
quieras subir el target a `ES2024` o activar `noUncheckedIndexedAccess`, lo
cambias aquí y los dos packages lo heredan sin tocar nada más.

`isolatedModules: true` es crítico para tsup y otros bundlers basados en
esbuild. Garantiza que cada archivo se pueda transpilar independientemente, lo
cual hace los builds rápidos.

`declaration: true` activa la emisión de archivos `.d.ts`. Esto se delega a
tsup en cada package vía `dts: true`, pero dejarlo en la base evita olvidos
si algún package se setupea a mano.

## Cómo se consume

Cada package tiene un `tsconfig.json` de seis líneas que extiende la base. Ver
`paso-03` para el ejemplo concreto del package `@ds/react`.

## Cómo correr el monorepo

```bash
cd ../paso-01
pnpm install
pnpm typecheck
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "tsconfig compartido"
- Monorepo completo: `paso-01/`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
