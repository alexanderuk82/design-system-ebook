# ejemplo_15_01

**Capítulo 15: Codificando componentes** · paso 01 (app runnable)

App Vite + React que demuestra todas las piezas del Cap 15 funcionando
juntas: tokens como CSS variables con selector `[data-theme]`, theme switch
runtime sin re-renders, Button polimórfico con `forwardRef`, CSS Modules
tokenizados por `data-variant` y `data-size`.

Los otros pasos (`paso-02` a `paso-06`) no duplican la app. Son extractos
que apuntan a archivos concretos de `paso-01/src/`.

## Estructura

```
src/
  tokens.css              # ejemplo_15_01 · CSS variables por tema
  reset.css               # reset mínimo que consume tokens
  main.tsx                # entry point (React 18)
  App.tsx                 # ejemplo_15_02 · theme switch con useState
  Button/
    Button.tsx            # ejemplo_15_03 · 15_05 · polimórfico + forwardRef
    Button.module.css     # ejemplo_15_04 · 15_06 · variantes por data-attr
    index.ts              # barrel export
```

## Cómo correrlo

```bash
cd es/examples/cap-15-codificando-componentes/paso-01
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Click al botón "Tema: light" arriba a la
derecha para alternar light/dark. Observa en DevTools que React no re-renderiza
descendientes, el cambio es puramente CSS (el atributo `data-theme` cambia en
el `<div>` root y la cascada recalcula).

Para build de producción:

```bash
npm run build      # typecheck + vite build
npm run preview    # sirve el build en localhost:4173
```

## Lo que este ejemplo demuestra

1. **Theming sin re-renders.** El switch de tema mueve `data-theme` en un único
   ancestor. Zero context providers, zero prop drilling. El navegador recalcula
   las variables en cascada. React ni se entera.
2. **Polimorfismo real.** `<Button as="a" href="...">` renderiza un `<a>`
   clickable con todos los estilos. El tipo genérico `C extends ElementType`
   garantiza que TypeScript infiere el resto de props (`href`, `target`, etc).
3. **forwardRef correcto.** El componente acepta `ref` y lo pasa al elemento
   interno. Necesario para librerías que necesitan medir el DOM (Popper,
   Floating UI) y para focus programático.
4. **CSS Modules + data attributes.** Cero classnames condicionales en TS. El
   componente expone `data-variant` y `data-size`, el CSS matchea por selector
   de atributo. Hace el DOM inspeccionable desde DevTools del navegador.
5. **Tokens todo el camino.** Cero hex codes en `Button.module.css`. Todo
   `var(--token)`. Cambiar el tema cambia los tokens, el Button reacciona sin
   tocarse.

## Cosas que vale la pena tocar

- Abre DevTools, pestaña Elements, y observa cómo `data-theme` cambia en el
  root al clickar el toggle. Las CSS variables en `:root` se recalculan en
  cascada.
- Añade `prefers-color-scheme` en `tokens.css` y sincroniza con `useState` vía
  `matchMedia`. Permite respetar la preferencia del sistema.
- Añade una tercera variante `accent` al tipo `Variant` y al CSS. TypeScript te
  forzará a cubrirla en cualquier lugar que use un `switch` sobre variant.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-15-codificando-componentes.md`
- Sección de theming: "Tokens como CSS variables, la capa base"
- Sección de estructura: "Estructura interna de un componente del DS"
- Cap base de tokens: `cap-05-tokens-visuales/paso-02` (OKLCH + dark)
- Cap base de componentes: `cap-09-construyendo-componentes/paso-08`

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
