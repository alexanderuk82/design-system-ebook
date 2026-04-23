# ejemplo_14_03

**Capítulo 14: Codebase setup** · paso 03 · `packages/react/tsconfig.json`

El tsconfig de un package que hereda la base. Seis líneas en lugar de cincuenta.

## Archivo

Vive en `paso-01/packages/react/tsconfig.json` dentro del monorepo real:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Por qué importa

El package solo declara lo específico de su contexto: dónde están las fuentes
(`rootDir`), dónde van los compilados (`outDir`), qué archivos cubre
(`include`). Todo lo demás (target, strict, jsx, moduleResolution) lo
hereda de la base.

Cuando el monorepo crece a diez packages, cada uno mantiene este shape
mínimo. Si añades un noveno package nuevo mañana, copiar este archivo
literalmente y ajustar el path al `extends` es todo el setup TypeScript
que necesitas.

## El package `@ds/tokens` usa el mismo patrón

Ver `paso-01/packages/tokens/tsconfig.json`. Idéntica estructura, distinto
package.

## Cómo correr el monorepo

```bash
cd ../paso-01
pnpm install
pnpm typecheck
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "tsconfig compartido"
- Monorepo completo: `paso-01/`
- Config base que extiende: `paso-02`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
