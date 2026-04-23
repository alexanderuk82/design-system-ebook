import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button a11y', () => {
  it('pasa axe sin violations', async () => {
    const { container } = render(
      <Button variant="primary">Guardar</Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
