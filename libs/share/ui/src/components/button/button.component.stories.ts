import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Buttons',
};
export default meta;
interface StoryButtonProps {
  label: string;
  disabled: boolean;
}

type Story = StoryObj<ButtonComponent & StoryButtonProps>;

export const SimpleButton: Story = {
  render: (props) => ({
    props,
    template: `<button [load]="load" ctrButton [disabled]="disabled" >{{ label }}</button>`,
  }),
  args: {
    label: 'primary button',
    disabled: false,
    load: false,
  },
};
