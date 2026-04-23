# ejemplo_16_04

**Capítulo 16: Testing** · paso 04 (a11y test mínimo runnable)

Versión aislada del test de accesibilidad del Button. Cuatro imports,
un describe, un it. Runnable con `npm install && npm test`. El objetivo
es enseñar lo pequeño que es añadir cobertura a11y a un componente
existente.

En paso 01 tienes la versión completa con cinco tests a11y cubriendo
variantes y meta-test. Este paso es el "minimum viable" por si quieres
empezar con un solo test y expandir después.

## Cómo correrlo

```bash
cd es/examples/cap-16-testing/paso-04
npm install
npm test
```

Salida esperada: un test pasando en ~1 segundo.

## Las tres líneas efectivas

```ts
const { container } = render(<Button>Guardar</Button>);
const results = await axe(container);
expect(results).toHaveNoViolations();
```

Eso es todo lo que axe necesita. El resto del archivo (imports,
describe, it) es boilerplate que ya tienes si ya tienes tests unit.

## Lo que axe cubre (y lo que no)

**Sí cubre** (~45 por ciento de WCAG 2.1 AA automatizable):
- Botones sin nombre accesible
- Inputs sin label
- Imágenes sin alt
- Contraste insuficiente (cuando hay estilos inline o CSS embebido)
- ARIA mal usado (atributos inválidos, combinaciones imposibles)
- Jerarquía de headings rota
- Duplicación de IDs

**No cubre** (el otro ~55 por ciento, requiere humano):
- Focus management (dónde va el focus después de cerrar modal).
- Orden lógico de tab (axe ve el DOM, no el flujo).
- Announcements de screen reader en cambios de estado.
- Usabilidad con teclado en widgets complejos.
- Contraste cuando el color viene de imagen o gradient.

La regla: axe como primera línea, sesión de QA con screen reader
(15 min por componente) como segunda. Cubiertas las dos, estás.

## Escalando a un DS completo

Patrón que funciona en un DS con 50 componentes:

```ts
// a11y.helper.ts
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ReactElement } from 'react';

export async function expectNoA11yViolations(ui: ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
```

Cada componente reduce el test a una línea:

```ts
it('primary pasa axe', async () => {
  await expectNoA11yViolations(<Button variant="primary">Guardar</Button>);
});
```

Helper equivalente ya implementado en `cap-10-accesibilidad/paso-01`.

## Volver al libro

- Texto fuente: `SPA/05-implementacion/cap-16-testing.md`, sección
  "Accessibility testing con axe"
- Cap relacionado: `cap-10-accesibilidad/paso-01` (helper reusable)
- Cap relacionado: `cap-16-testing/paso-01` (versión completa)

## Licencia

MIT. Ver [LICENSE](../../../../LICENSE) en la raíz del repo.
