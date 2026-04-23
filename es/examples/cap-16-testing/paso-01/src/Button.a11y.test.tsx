import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button a11y', () => {
  it('primary con label pasa axe sin violations', async () => {
    const { container } = render(<Button variant="primary">Guardar</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('secondary con label pasa axe sin violations', async () => {
    const { container } = render(<Button variant="secondary">Cancelar</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('danger con label pasa axe sin violations', async () => {
    const { container } = render(<Button variant="danger">Eliminar cuenta</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('loading con label sigue siendo accesible', async () => {
    const { container } = render(
      <Button variant="primary" loading>
        Guardando
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meta test: un button sin nombre accesible SI falla axe', async () => {
    const { container } = render(<Button aria-label="" />);
    const results = await axe(container);
    expect(results).not.toHaveNoViolations();
  });
});
