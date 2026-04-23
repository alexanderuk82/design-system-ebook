# ejemplo_14_04

**Capítulo 14: Codebase setup** · paso 04 · `.eslintrc.cjs`

Configuración de ESLint compartida en el root, con énfasis en accesibilidad
JSX y prevención de imports relativos entre packages.

## Archivo

Vive en `paso-01/.eslintrc.cjs` dentro del monorepo real:

```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: { version: "18" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      { patterns: ["../../packages/*"] },
    ],
  },
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
};
```

## Por qué importa

`eslint-plugin-jsx-a11y` complementa los tests de axe del Cap 10. Detecta
violaciones comunes en JSX (img sin alt, label sin htmlFor, div con onClick
sin role) **antes** de que el código llegue a CI. Es validación a nivel de
linting que falla rápido y da feedback inmediato en el editor.

`no-restricted-imports` con el pattern `../../packages/*` previene que un
package importe desde otro usando paths relativos. Fuerza a importar vía
nombre (`import { tokens } from '@ds/tokens'`), no `import { tokens } from
'../../packages/tokens/src'`. Mantiene el grafo de dependencias limpio.

`react/react-in-jsx-scope: off` es necesario en React 17+ porque ya no hace
falta importar React explícitamente para usar JSX (lo gestiona el nuevo
`react-jsx` runtime).

## Cómo correr el monorepo

```bash
cd ../paso-01
pnpm install
pnpm lint
```

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-14-codebase-setup.md`, sección "ESLint y Prettier"
- Monorepo completo: `paso-01/`
- Cap relacionado: `cap-10-accesibilidad/paso-01` (axe en tests)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
