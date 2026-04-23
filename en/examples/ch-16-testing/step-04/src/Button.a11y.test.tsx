import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button a11y', () => {
  it('passes axe with no violations', async () => {
    const { container } = render(
      <Button variant="primary">Save</Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
