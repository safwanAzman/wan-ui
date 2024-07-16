
import type { Meta, StoryObj } from '@storybook/react';
import { default as Button } from '../index';

const meta: Meta<typeof Button> = {
  title: 'Ui/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};