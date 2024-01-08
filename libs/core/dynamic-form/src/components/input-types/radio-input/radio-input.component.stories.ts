import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { InputField } from '../../../models/input-field';
import { InputType } from '../../../models/input-type';

import { RadioInputComponent } from './radio-input.component';

const meta: Meta<RadioInputComponent> = {
  component: RadioInputComponent,
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StoryRadioInputProps {
  inputField: InputField;
}

type Story = StoryObj<RadioInputComponent & StoryRadioInputProps>;

export const RadioInput: Story = {
  render: (props) => ({
    props,
    template: `<contler-radio-input 
     [inputField]="inputField">
     </contler-radio-input>`,
  }),
  args: {
    inputField: {
      description: 'Radio input',
      type: InputType.RADIO,
      option: ['Option 1', 'Option 2', 'Option 3'],
    },
  },
};
