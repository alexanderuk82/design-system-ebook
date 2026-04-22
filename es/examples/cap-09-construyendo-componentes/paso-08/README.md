# ejemplo_09_08

**Capítulo 9: Construyendo componentes** · paso 08

Tests de accesibilidad con axe sobre el Button. Cuatro tests, basados en el contrato del usuario: renderiza con label, dispara click, respeta los estados, y pasa la auditoría axe sin violaciones. Si solo escribes uno, escribe el de axe: detecta el 70% de los bugs de accesibilidad antes de producción.

## Cómo correrlo

A diferencia de los otros pasos del cap 9, este sí necesita `npm install` (Vitest, testing-library, jest-axe).

```bash
cd es/examples/cap-09-construyendo-componentes/paso-08
npm install
npm test
```

Validado localmente: las 4 pruebas pasan en ~2.5s.

## Los cuatro tests, basados en contrato no en implementación

```tsx
it("renderiza con su label y dispara el click")
it("no dispara click cuando esta disabled")
it("bloquea el click mientras loading y expone aria-busy")
it("no tiene violaciones de accesibilidad")
```

Ninguno mira detalle interno. Ninguno hace `expect(wrapper.find('.btn-primary')).toBeDefined()`. Todos usan los queries semánticos de Testing Library (`getByRole`) y verifican comportamiento observable. Si mañana refactorizas el Button por dentro pero mantienes el contrato, los tests siguen pasando. Eso es lo que los hace útiles a largo plazo.

## El test de axe, el que más vale por línea de código

```tsx
it("no tiene violaciones de accesibilidad", async () => {
  const { container } = render(<Button>Accesible</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

`axe-core` (la librería que `jest-axe` envuelve) corre 90+ reglas de accesibilidad sobre el HTML renderizado. Detecta cosas como contraste de color, atributos ARIA mal puestos, labels faltantes, headings fuera de orden, y mucho más.

No detecta todo (algunas reglas necesitan contexto humano), pero **detecta el 70% de los problemas reales que llegarían a producción**. Es el ROI más alto por línea de test que vas a escribir en tu DS.

## Configuración importante

**Pool de Vitest en `forks` con `singleFork: true`.** Sin esto, Vitest falla en Windows con `spawn UNKNOWN` por una limitación del worker pool de tinypool en algunas configuraciones de Node + Windows. El pool de procesos en lugar de threads, con un solo fork, evita el problema sin perder mucha velocidad.

**`@testing-library/jest-dom` extendido en `setup.ts`.** Habilita matchers como `toHaveAttribute`, `toBeDisabled`, `toHaveClass`. Sin esto, los matchers DOM no existen en Vitest base.

## Lo que vale la pena tocar

Rompe la accesibilidad del Button: borra el `aria-busy` del componente y haz `loading` true. Corre `npm test`. El test 4 (axe) sigue pasando porque axe no flaggea ese atributo faltante por sí mismo (la regla específica varía según versión). Pero el test 3 (que verifica `aria-busy`) sí falla. Cubrir lo que axe deja fuera es por eso que escribimos tests de comportamiento además del axe global.

Cambia el `<button>` interno a un `<div onClick>`. Corre los tests. Múltiples fallan: `getByRole("button")` ya no encuentra nada (porque un div no tiene rol `button` por defecto), y axe flaggea que un elemento clickable no tiene rol semántico.

Añade un Input al Button (raro pero hipotético) sin label. Axe flaggea: "Form elements must have labels". El test rojo te avisa antes de mergear.

## Volver al libro

- Texto fuente: `SPA/03-componentes/cap-09-construyendo-componentes.md`, sección "Tests mínimos por componente"
- Donde se profundiza en accesibilidad: capítulo 10 (a11y por diseño)
- Donde se conecta con CI: capítulo 16 (testing) y capítulo 12 (DS Sync pipeline)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
