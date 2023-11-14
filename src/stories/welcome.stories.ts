import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from '~/widgets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Welcome',
  component: Welcome,
  decorators: [withRouter],
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Welcome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'Петр',
    },
  },
};
