import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'Guardar',
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true },
};

export const ClickFires: Story = {
  args: { variant: 'primary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Guardar' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const LoadingBlocksClick: Story = {
  args: { variant: 'primary', loading: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Guardar' });

    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
