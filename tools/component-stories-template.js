'use strict'

module.exports = ({ componentName }) => {
  return `
import type { Meta, StoryObj } from '@storybook/react';

import { default as ${componentName} } from '../index'

const meta: Meta<typeof ${componentName}> = {
  title: 'Ui/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    // Add props here
  },
};
`.trim()
}
