# ejemplo_20_01

**Capítulo 20: Multi-marca** · paso 01 (tokens compilados, tres marcas lado a lado)

HTML estático con las tres marcas del libro (fintech, health, retail)
renderizando el mismo Button + Card. Lo único que cambia entre ellas es el
atributo `data-brand` en el elemento padre. CSS vars en cascada hacen el
resto.

Abre `index.html` en cualquier navegador moderno. No hay build, no hay
`npm install`, no hay bundler.

```bash
start es/examples/cap-20-multi-marca/paso-01/index.html
```

## Las tres capas

```
tokens.css
├── Capa 1: primitives       ← --blue-500, --grey-900, --radius-full, ...
├── Capa 2: semantic         ← [data-brand='fintech'] { --color-brand: ... }
└── Capa 3: componentes      ← .button { background: var(--color-brand) }
```

**Primitives**. Escala universal. `--blue-500`, `--radius-sm`, `--font-sans`.
No pertenecen a ninguna marca. Inventario disponible para ser referenciado.

**Semantic**. Cada marca es un mode. `[data-brand='fintech']` hace que
`--color-brand` apunte a `--blue-500`. `[data-brand='health']` lo apunta a
`--green-500`. El componente consume `--color-brand`, no los primitives.

**Componentes**. Idénticos entre marcas. `.button` hace
`background: var(--color-brand)` y nunca menciona `blue` ni `green`.

## Por qué el Button no se toca

Abre `tokens.css` y busca la declaración de `.button`. Son ocho líneas. No
hay ningún `if fintech`, ni ningún override específico de marca. Solo
consume semantic vars.

Cambiar la marca es cambiar `data-brand` en el root. Nada más. Cero
re-renders, cero JS, cero bundling. La cascada de CSS vars hace todo.

Si miras una marca después de otra, ves que:

- El fill del Button cambia (azul → verde → rojo).
- El radius del Button cambia (sm → lg → full).
- El heading del Card cambia la font-family en `health` (serif en vez de
  sans).

Tres cambios de look, un solo HTML, un solo CSS.

## Lo que no se hace (y por qué)

Tentación típica: meter un `if brand === 'health' return <SpecialButton>`
dentro del componente. Para una diferencia sutil como el radius ya es
ruido; para tres marcas escala a un componente con tres ramas y después
nadie quiere tocarlo.

La regla del capítulo: cualquier cosa que varíe entre marcas tiene que ser
un token, nunca una rama `if` en el componente. Si una marca pide algo
único (una sombra extra, por ejemplo), ese algo entra como token semantic
(`--shadow-button`) que en dos marcas es `none` y en la tercera es
`shadow.sm`. El componente sigue siendo uno.

## Cosas que vale la pena tocar

- Cambia `--radius-control` en `[data-brand='fintech']` a `var(--radius-full)`
  y recarga. Verás el botón de fintech volverse pill. Un cambio de token
  semantic propaga instantáneamente sin tocar HTML ni JS.
- Añade una cuarta marca `[data-brand='energy']` con `--color-brand` en
  amarillo y el Button ya funciona para ella. La arquitectura se extiende
  agregando un bloque de CSS, no tocando componentes.
- Duplica la misma Card dos veces bajo una misma marca, cambia el
  `data-brand` a nivel de Card individual en una de ellas. Funciona.
  `data-brand` puede vivir en cualquier ancestro, no solo en el root.

## Volver al libro

- Texto fuente: `SPA/07-avanzado/cap-20-multi-marca.md`, sección "Cómo se
  ve en código"
- Cap relacionado: `cap-20-multi-marca/paso-02` (el switcher runtime en
  React)
- Cap relacionado: `cap-05-tokens-visuales/paso-01` (el patrón semantic
  con light/dark, aquí aplicado a otra dimensión)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
