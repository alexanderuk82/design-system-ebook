# ejemplo_20_02

**Capítulo 20: Multi-marca** · paso 02 (switcher runtime con React)

La misma arquitectura del paso-01 pero con un switcher runtime. Clicas
`fintech`, `health` o `retail` y el Button cambia de color y radius sin
que se vuelva a montar. Todo por la cascada de CSS vars.

```bash
start es/examples/cap-20-multi-marca/paso-02/index.html
```

React cargado desde CDN via UMD + Babel standalone. Cero build, cero
`npm install`.

## El switcher en tres líneas

```tsx
const [brand, setBrand] = useState('fintech');

return (
  <div data-brand={brand}>
    <Button>Continuar con {brand}</Button>
  </div>
);
```

Eso es todo. El `data-brand` en el contenedor selecciona el mode del
semantic, y el CSS del Button consume `--color-brand` y `--radius-control`
sin saber qué marca está activa.

## Cero re-render del componente

Si abres las React DevTools y haces profile mientras cambias de marca,
verás que el `<Button>` NO re-renderiza sus hijos. React re-renderiza el
`App` (porque cambia el `brand` state), pero el DOM del Button reusa el
mismo nodo. Solo cambia la cascada de CSS aplicada.

Esto es barato incluso con cientos de componentes, porque React solo
reconcilia el DOM del ancestro que tiene el `data-brand`.

## Por qué este patrón escala

Imagina que el producto final tiene:

- 50 componentes (Button, Card, Modal, Toast, Input...).
- 30 pantallas, cada una con decenas de estos componentes.
- 3 marcas activas.

Sin este patrón: cada componente necesita saber de marca, y el bundle
duplica estilos. Con este patrón: un solo bundle para los 50 componentes,
tres bloques de CSS para los semantic modes, y el producto puede cambiar
de marca a nivel de página, de sección, o incluso de componente
individual. La pregunta "¿cuánto cuesta soportar una cuarta marca?"
responde con 20 líneas de CSS.

## Cosas que vale la pena tocar

- Abre React DevTools y comprueba que el switcher cambia el state pero no
  re-monta el Button (misma instancia, mismos hooks, mismos refs).
- Añade un segundo Button dentro de la misma App y verás que comparte la
  marca. Para mostrar dos marcas a la vez, mueve el `data-brand` dentro
  del Button, no fuera.
- Persiste la marca seleccionada en `localStorage`. Dos líneas:
  `useEffect(() => localStorage.setItem('brand', brand), [brand])` y leer
  en el `useState` inicial.

## Volver al libro

- Texto fuente: `SPA/07-avanzado/cap-20-multi-marca.md`, sección "Cómo se
  ve en código" (segundo bloque)
- Cap relacionado: `cap-20-multi-marca/paso-01` (tokens estáticos con las
  tres marcas lado a lado)
- Cap relacionado: `cap-15-codificando-componentes/paso-01` (mismo
  patrón CSS vars aplicado a runtime theming claro/oscuro)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
