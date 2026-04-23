import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "Variante semantica. Usa una sola primary por contexto.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Guardar",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancelar" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Volver" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Eliminar cuenta" },
};

export const Loading: Story = {
  args: { loading: true, children: "Guardando" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
