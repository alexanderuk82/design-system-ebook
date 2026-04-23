import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza el texto hijo', () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  });

  it('invoca onClick al hacer click', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Guardar</Button>);
    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('bloquea el click cuando loading', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} loading>
        Guardar
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('bloquea el click cuando disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Guardar
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('expone variant y size via data attributes', () => {
    render(
      <Button variant="primary" size="lg">
        Guardar
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'lg');
  });
});
