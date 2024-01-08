import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { SelectOptionComponent } from './select-option.component';

const meta: Meta<SelectOptionComponent> = {
  component: SelectOptionComponent,
  title: 'Card',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StorySelectOptionProps {
  selected: boolean;
  label: string;
  subtitle: string;
}

type Story = StoryObj<SelectOptionComponent & StorySelectOptionProps>;

export const SimpleSelectOption: Story = {
  render: (props) => ({
    props,
    template: `<ctr-select-option [label]="label" [subtitle]="subtitle" [selected]="selected" ></ctr-select-option>`,
  }),
  args: {
    label: 'As soon as possible',
    selected: false,
    subtitle: 'It will take us at least 60 minutes'
  },
};
