import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import { ReviewsEmptyState } from './ReviewsEmptyState';

const meta = {
  args: {
    onCtaClick: fn(),
  },
  component: ReviewsEmptyState,
} satisfies Meta<typeof ReviewsEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className='max-w-[458px]'>
      <ReviewsEmptyState {...args} />
    </div>
  ),
};
