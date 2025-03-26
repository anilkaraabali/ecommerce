import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import { AuthUnlockFeaturesModal } from '../components/AuthUnlockFeaturesModal';

const meta = {
  component: AuthUnlockFeaturesModal,
} satisfies Meta<typeof AuthUnlockFeaturesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    isOpen: true,
    onOpenChange: fn(),
  },
};
