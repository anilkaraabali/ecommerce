import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import { AuthEmailForm } from '../components/AuthEmailForm';

const meta = {
  component: AuthEmailForm,
} satisfies Meta<typeof AuthEmailForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onCancel: fn(),
    setEmail: fn(),
    setStep: fn(),
  },
  render: (args) => (
    <div className='max-w-md'>
      <AuthEmailForm {...args} />
    </div>
  ),
};
