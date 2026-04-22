# ejemplo_09_04

**Capítulo 9: Construyendo componentes** · paso 04

Select construido sobre Radix UI. Recibes navegación con teclado, type-to-jump, escape para cerrar y portal para escapar del overflow del padre, todo gratis. Tu trabajo es estilizar.

## Cómo correrlo

Abre `index.html` en el navegador. Necesita conexión a internet porque tira React, ReactDOM y `@radix-ui/react-select` desde [esm.sh](https://esm.sh) usando un importmap. No hay npm install local.

## El cambio respecto a paso-01 y paso-03

Aquí dejo los `<script>` UMD de React y monto un **importmap** que resuelve `react`, `react-dom/client` y `@radix-ui/react-select` contra esm.sh. Luego el script usa `data-type="module"` para que Babel standalone trate el TSX como módulo ES y los `import` resuelvan via el importmap.

```html
<script type="importmap">
{ "imports": {
  "react":              "https://esm.sh/react@18",
  "react-dom/client":   "https://esm.sh/react-dom@18/client",
  "@radix-ui/react-select": "https://esm.sh/@radix-ui/react-select@2"
}}
</script>
```

Es una técnica que sirve para cualquier librería npm en un ejemplo standalone.

## Por qué Radix y no construir desde cero

El libro lo dice claro: construir un combobox accesible bien es trabajo de semanas. Radix te da el árbol de comportamientos correcto (foco, teclado, type-to-jump, escape, portal, ARIA roles) sin que escribas una línea de lógica de accesibilidad. Solo conectas las piezas (`Trigger`, `Content`, `Viewport`, `Item`, `ItemText`, `ItemIndicator`) y aplicas tu CSS.

Si tu producto vive en una sola plataforma, esta es la decisión sensata. Las alternativas serias son Ariakit y Headless UI, mismo modelo.

## Lo que el componente expone

```tsx
<Select
  label="Pais"
  value={country}
  onValueChange={setCountry}
  options={countries}
/>
```

API mínima. Cuatro props. La complejidad de Radix queda dentro del componente. El consumidor (otro dev del producto) ve lo mismo que vería de un `<select>` nativo, pero recibe un combobox decente.

## El CSS lee data-attributes de Radix

Fíjate en el CSS:

```css
.select-item[data-highlighted] { background: var(--color-emerald-soft); }
.select-item[data-state="checked"] { font-weight: 500; }
```

Radix gestiona los estados (`data-highlighted` cuando el item está navegado por teclado, `data-state="checked"` cuando es el seleccionado) y deja a tu CSS la decoración. Es la misma idea que vimos en el Button del `paso-01` con `data-variant`: estados como atributos, no como classnames condicionales.

## Lo que vale la pena tocar

Tipea una letra cuando el panel está abierto: salta al primer item que coincide. Type-to-jump viene gratis con Radix.

Cierra con Escape. Click fuera también cierra. Tab navega los items. Shift+Tab navega hacia atrás. Cero código de keyboard handling escrito por ti.

Cambia `position="popper"` por `position="item-aligned"` en el `Content`. Cambia el comportamiento de posicionamiento del panel (item-aligned trata de centrar el item seleccionado bajo el trigger, popper lo coloca fijo debajo). Las dos formas son válidas, popper es más predecible.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Molecule 1, Select con combobox"
- Donde se discute construir desde cero vs componer: misma sección
- Documentación oficial Radix Select: https://www.radix-ui.com/primitives/docs/components/select

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
