import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { StrokedButtonComponent } from './stroked-button.component';

const meta: Meta<StrokedButtonComponent> = {
  component: StrokedButtonComponent,
  title: 'Buttons',
  decorators: [
    applicationConfig({
      providers: [provideStore(),],
    }),
  ],
};
export default meta;

interface StoryButtonProps {
  label: string;
  disabled: boolean;
}

type Story = StoryObj<StrokedButtonComponent & StoryButtonProps>;

export const StrokedButton: Story = {
  render: (props) => ({
    props,
    template: `<button [load]="load" ctrStrokedButton [disabled]="disabled" >{{ label }}</button>`,
  }),
  args: {
    load: false,
    label: 'stroked button',
    disabled: false,
  },
};
