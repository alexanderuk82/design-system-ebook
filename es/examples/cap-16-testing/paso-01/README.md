# ejemplo_16_01

**Capítulo 16: Testing** · paso 01 (setup Vitest runnable)

Proyecto Vitest + Testing Library + vitest-axe con Button + diez tests
(cinco unit + cuatro a11y + un meta-test). Los pasos 02 a 05 son extractos
de otros artefactos del pipeline de testing: Storybook interactions, CI de
Chromatic, config del test runner.

## Estructura

```
src/
  Button.tsx              # componente bajo test
  Button.test.tsx         # ejemplo_16_01 · unit tests con Testing Library
  Button.a11y.test.tsx    # ejemplo_16_04 · tests de axe sobre variantes
  setup.ts                # extiende matchers de vitest-axe + jest-dom
vitest.config.ts
tsconfig.json
package.json
```

## Cómo correrlo

```bash
cd es/examples/cap-16-testing/paso-01
npm install
npm test
```

Salida esperada: diez tests pasando en ~2 segundos. Si uno falla, Vitest
muestra el nombre del test, el output diff, y el stack trace. El meta-test
al final verifica que axe SÍ detecta botones sin nombre accesible, es el
"test del test".

Para watch mode durante desarrollo:

```bash
npm run test:watch
```

## Lo que este ejemplo demuestra

1. **userEvent, no fireEvent.** `userEvent.click()` simula el click completo
   (mousedown, mouseup, click, focus). `fireEvent.click()` dispara solo el
   evento, lo cual puede dar falsos positivos. La regla de Testing Library
   moderna: userEvent siempre.
2. **Queries por rol.** `screen.getByRole('button', { name: 'Guardar' })`
   busca el elemento como lo haría un screen reader. Más robusto a
   refactors que `getByTestId` o `getByClassName`.
3. **`loading` bloquea click.** El handler se sustituye por `undefined` en
   el TSX cuando `loading` es true. Cuatro líneas de lógica validadas por
   el test "bloquea el click cuando loading".
4. **axe cubre violations automatizables.** Cuatro tests a11y cubren las
   variantes principales + el estado loading. Si el Button pierde su texto
   accesible en algún path, axe falla con el nombre exacto de la regla
   violada.
5. **Meta-test.** El último test de `Button.a11y.test.tsx` renderiza un
   botón deliberadamente roto y verifica que axe lo detecta. Si alguien
   rompe el setup de axe en el futuro (típico: no extiende matchers, todo
   pasa en silencio), este test rojo alerta.

## Config relevantes

**`pool: "forks" + singleFork: true`** en `vitest.config.ts`. Necesario en
Windows para bypass del bug `spawn UNKNOWN` de tinypool con esbuild. Sin
esto, Vitest crashea al arrancar en Windows.

**`setupFiles: ['./src/setup.ts']`**. Carga los matchers de jest-dom y
vitest-axe antes de cada test. Sin esto, `toHaveAttribute` y
`toHaveNoViolations` no existen.

## Qué verás en stderr (y por qué ignorarlo)

Durante los tests a11y aparecerán warnings tipo
`Not implemented: HTMLCanvasElement.prototype.getContext`. Es jsdom que
no implementa canvas al completo. axe-core lo usa para detectar iconos
con ligaduras tipográficas; cuando canvas no está disponible salta esa
comprobación y sigue. Los diez tests pasan igual. Para silenciar el
warning hay que añadir `canvas` como devDep (~40 MB), no compensa para
este ejemplo.

## Cosas que vale la pena tocar

- Cambia `aria-busy={loading}` a `aria-busy={false}` en `Button.tsx` y
  corre tests. El a11y test de loading debería seguir pasando (axe no
  requiere aria-busy), pero el unit test "bloquea el click cuando loading"
  pasa todavía. Esto es valioso: separar responsabilidades entre tests.
- Renombra `variant` a `kind` en `Button.tsx`. TypeScript te forzará a
  actualizar 5+ sitios. Sin los tests del "contrato público" esta
  refactorización sería más arriesgada.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-16-testing.md`, secciones
  "Unit testing con Vitest y Testing Library" y "Accessibility testing con axe"
- Cap relacionado: `cap-10-accesibilidad/paso-01` (helper de a11y)
- Cap relacionado: `cap-09-construyendo-componentes/paso-08` (Button + tests)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
