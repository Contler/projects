import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { InputField } from '../../../models/input-field';
import { InputType } from '../../../models/input-type';

import { MultiSelectComponent } from './multi-select.component';

const meta: Meta<MultiSelectComponent> = {
  component: MultiSelectComponent,
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StoryMultiSelectInputProps {
  inputField: InputField;
}

type Story = StoryObj<MultiSelectComponent & StoryMultiSelectInputProps>;

export const MultiSelect: Story = {
  render: (props) => ({
    props,
    template: `<contler-multi-select 
     [inputField]="inputField">
     </contler-multi-select>`,
  }),
  args: {
    inputField: {
      description: 'Text input',
      type: InputType.TEXT,
      option: ['a', 'b', 'c'],
    },
  },
};
