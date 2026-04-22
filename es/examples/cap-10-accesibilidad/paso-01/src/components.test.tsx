import { describe, it, expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { expectNoA11yViolations } from "./a11y-helper";
import { Button, Input, Card, BrokenButton } from "./components";

expect.extend(toHaveNoViolations);

describe("audit a11y por componente", () => {
  it("Button con label de texto pasa", async () => {
    await expectNoA11yViolations(<Button>Guardar</Button>);
  });

  it("Input con label asociado pasa", async () => {
    await expectNoA11yViolations(
      <Input label="Correo" type="email" helper="Te enviaremos la confirmacion aqui" />
    );
  });

  it("Card con contenido textual pasa", async () => {
    await expectNoA11yViolations(
      <Card>
        <h2>Titulo</h2>
        <p>Cuerpo del card.</p>
      </Card>
    );
  });
});

describe("el helper falla cuando hay violaciones reales", () => {
  it("BrokenButton sin label falla con violacion clara", async () => {
    // Esperamos que el assert lance, asi confirmamos que el helper
    // SI detecta el problema. Este es el meta-test del helper.
    await expect(
      expectNoA11yViolations(<BrokenButton onClick={() => {}} />)
    ).rejects.toThrow();
  });
});
