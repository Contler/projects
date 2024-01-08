import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { BoxFieldComponent } from './box-field.component';

const meta: Meta<BoxFieldComponent> = {
  component: BoxFieldComponent,
  title: 'BoxField',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;
interface StoryBoxFieldProps {
  title: string | undefined;
  label: string | undefined;
  description: string | undefined;
}

type Story = StoryObj<BoxFieldComponent & StoryBoxFieldProps>;

export const SimpleBoxField: Story = {
  render: (props) => ({
    props,
    template: `<ctr-box-field  
    [label]="label"
    [title]="title"
    [description]="description">
    <ng-container icon>
    info
    </ng-container>
    </ctr-box-field>`,
  }),
  args: {
    title: 'Paymenth Method',
    label: 'Charge to the room',
    description: 'Select the preferred payment method',
  },
};
