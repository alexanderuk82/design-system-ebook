# ejemplo_14_01

**Capítulo 14: Codebase setup** · paso 01 (monorepo completo)

El monorepo real que referencia el Cap 14. Los otros seis pasos (`paso-02` a
`paso-07`) no duplican el repo, son extractos documentados que apuntan a
archivos concretos de esta carpeta.

## Qué hay dentro

```
package.json              # ejemplo_14_01 · root del monorepo
pnpm-workspace.yaml       # workspace declarativo
tsconfig.base.json        # ejemplo_14_02 · config TS compartida
.eslintrc.cjs             # ejemplo_14_04 · lint con jsx-a11y + react
.prettierrc               # ejemplo_14_05 · formato compartido
turbo.json                # ejemplo_14_07 · pipeline de tareas
packages/
  tokens/
    package.json          # paquete @ds/tokens
    tsconfig.json         # hereda de base
    tsup.config.ts        # build ESM + CJS + .d.ts
    src/index.ts          # record tipado de tokens
    src/tokens.css        # CSS con las variables
  react/
    package.json          # paquete @ds/react, depende de @ds/tokens
    tsconfig.json         # ejemplo_14_03 · hereda de base
    tsup.config.ts        # ejemplo_14_06 · marca react como external
    src/index.ts          # re-export de Button
    src/Button.tsx        # componente que consume tokens
```

## Cómo correrlo

Requiere **pnpm 9** instalado globalmente.

```bash
cd es/examples/cap-14-codebase-setup/paso-01
pnpm install
pnpm build
pnpm typecheck
pnpm lint
```

`pnpm build` hace que Turborepo orqueste:
1. `@ds/tokens` se builda primero (tsup produce `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`).
2. `@ds/react` espera a tokens (`dependsOn: ["^build"]`) y después builda.
3. La segunda vez que corras `pnpm build` sin cambios, Turborepo sirve del cache.

## Lo que este ejemplo demuestra

1. **Workspace real.** `@ds/react` importa `@ds/tokens` con `workspace:*`. No hay paths relativos entre packages, pnpm symlinkea el package.
2. **Config compartida.** Dos packages extienden `tsconfig.base.json`, una sola configuración de TypeScript gobierna el monorepo.
3. **Build tooling unificado.** tsup con la misma shape en ambos packages. Cero custom webpack/rollup.
4. **Pipeline tipado.** Turborepo conoce el grafo y no necesita que le expliques que tokens va antes que react.
5. **Lint con a11y integrado.** `eslint-plugin-jsx-a11y` corre automáticamente sobre el JSX del Button y marca violaciones sin esperar a tests.

## Cosas que vale la pena tocar

- Añade un tercer package (`@ds/icons`) con un SVG component. Verás cómo `pnpm install` lo detecta solo y Turborepo lo integra al pipeline.
- Cambia `target` en `tsconfig.base.json` de `ES2022` a `ES2024` y corre `pnpm typecheck`. La nueva config se aplica a los dos packages sin tocar ninguno.
- Abre `packages/react/src/Button.tsx` y pon `<img src="x" />`. El `eslint-plugin-jsx-a11y` debería marcar que falta alt.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`
- Este monorepo se extiende en el Cap 15 (codificación de componentes) y Cap 16 (testing).

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
