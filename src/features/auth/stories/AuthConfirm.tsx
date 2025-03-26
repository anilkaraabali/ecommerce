import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import { AuthConfirm } from '../components/AuthConfirm';

const meta = {
  component: AuthConfirm,
} satisfies Meta<typeof AuthConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    email: 'john@doe.com',
    onBack: fn(),
  },
  render: (args) => (
    <div className='max-w-md'>
      <AuthConfirm {...args} />
    </div>
  ),
};
