import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { InputField } from '../../../models/input-field';
import { InputType } from '../../../models/input-type';

import { MultiSelectWithQuantitiesComponent } from './multi-select-with-quantities.component';

const meta: Meta<MultiSelectWithQuantitiesComponent> = {
  component: MultiSelectWithQuantitiesComponent,
  title: 'Input',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StoryButtonProps {
  inputField: InputField;
  options: string[];
}

type Story = StoryObj<MultiSelectWithQuantitiesComponent & StoryButtonProps>;

export const MultiSelectWithQuantities: Story = {
  render: (props) => ({
    props,
    template: `<contler-multi-select-with-quantities 
     [inputField]="inputField">
     </contler-multi-select-with-quantities>`,
  }),
  args: {
    inputField: {
      description: 'Multi Select With Quantities',
      option: ['option1', 'option2', 'option3'],
      type: InputType.MULTISELECT_WITH_QUANTITY,
    },
  },
};
