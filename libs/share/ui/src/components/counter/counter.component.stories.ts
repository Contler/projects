import { Meta, StoryObj } from '@storybook/angular';

import { CounterComponent } from './counter.component';

const meta: Meta<CounterComponent> = {
  component: CounterComponent,
  title: 'Counter',
};

export default meta;

type Story = StoryObj<CounterComponent>;

export const Default: Story = {};
