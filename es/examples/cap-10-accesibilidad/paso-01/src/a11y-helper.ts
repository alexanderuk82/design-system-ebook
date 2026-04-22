// Helper reutilizable para auditar accesibilidad de cualquier componente.
// Copia este archivo a tu proyecto y usalo en los tests de cada componente.

import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { expect } from "vitest";
import type { ReactElement } from "react";

/**
 * Audita un JSX con axe-core y falla el test si hay violaciones a11y.
 *
 * Uso:
 *   await expectNoA11yViolations(<Button>Accesible</Button>);
 *
 * Detecta el 30-50% de problemas a11y reales segun research de Deque.
 * El resto requiere verificacion humana (teclado puro, screen reader).
 */
export async function expectNoA11yViolations(jsx: ReactElement) {
  const { container } = render(jsx);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
