import { describe, it, expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { expectNoA11yViolations } from "./a11y-helper";
import { Button, Input, Card, BrokenButton } from "./components";

expect.extend(toHaveNoViolations);

describe("a11y audit per component", () => {
  it("Button with text label passes", async () => {
    await expectNoA11yViolations(<Button>Save</Button>);
  });

  it("Input with associated label passes", async () => {
    await expectNoA11yViolations(
      <Input label="Email" type="email" helper="We'll send the confirmation here" />
    );
  });

  it("Card with textual content passes", async () => {
    await expectNoA11yViolations(
      <Card>
        <h2>Title</h2>
        <p>Card body.</p>
      </Card>
    );
  });
});

describe("the helper actually fails when there are real violations", () => {
  it("BrokenButton with no label fails with a clear violation", async () => {
    // We expect the assert to throw, so we confirm the helper
    // really detects the problem. This is the meta-test of the helper.
    await expect(
      expectNoA11yViolations(<BrokenButton onClick={() => {}} />)
    ).rejects.toThrow();
  });
});
