import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  it("renderiza con su label y dispara el click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);

    const button = screen.getByRole("button", { name: "Guardar" });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("no dispara click cuando esta disabled", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Guardar</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("bloquea el click mientras loading y expone aria-busy", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} loading>Guardando</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  // El test mas valioso. Detecta ~70% de bugs a11y antes de produccion.
  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Button>Accesible</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
