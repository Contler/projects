import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
};
export default meta;
interface StoryButtonProps {
  label: string;
  disabled: boolean;
}

type Story = StoryObj<ButtonComponent & StoryButtonProps>;

export const Primary: Story = {
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
