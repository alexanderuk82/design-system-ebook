// Reusable helper to audit any component's accessibility.
// Copy this file into your project and use it from each component's tests.

import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { expect } from "vitest";
import type { ReactElement } from "react";

/**
 * Audits a JSX with axe-core and fails the test on any a11y violation.
 *
 * Usage:
 *   await expectNoA11yViolations(<Button>Accessible</Button>);
 *
 * Catches 30-50% of real a11y problems according to Deque research.
 * The rest needs human verification (keyboard-only, screen reader).
 */
export async function expectNoA11yViolations(jsx: ReactElement) {
  const { container } = render(jsx);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
