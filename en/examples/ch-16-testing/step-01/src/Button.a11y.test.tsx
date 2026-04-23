import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button a11y', () => {
  it('primary with label passes axe with no violations', async () => {
    const { container } = render(<Button variant="primary">Save</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('secondary with label passes axe with no violations', async () => {
    const { container } = render(<Button variant="secondary">Cancel</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('danger with label passes axe with no violations', async () => {
    const { container } = render(<Button variant="danger">Delete account</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('loading with label stays accessible', async () => {
    const { container } = render(
      <Button variant="primary" loading>
        Saving
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meta test: a button with no accessible name DOES fail axe', async () => {
    const { container } = render(<Button aria-label="" />);
    const results = await axe(container);
    expect(results).not.toHaveNoViolations();
  });
});
