import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { InputField } from '../../../models/input-field';
import { InputType } from '../../../models/input-type';

import { TextInputComponent } from './text-input.component';

const meta: Meta<TextInputComponent> = {
  component: TextInputComponent,
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StoryTextInputProps {
  inputField: InputField;
}

type Story = StoryObj<TextInputComponent & StoryTextInputProps>;

export const TextInput: Story = {
  render: (props) => ({
    props,
    template: `<contler-text-input 
     [inputField]="inputField">
     </contler-text-input>`,
  }),
  args: {
    inputField: {
      description: 'Text input',
      type: InputType.TEXT,
    },
  },
};
