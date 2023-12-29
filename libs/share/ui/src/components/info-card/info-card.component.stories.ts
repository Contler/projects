import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { InfoCardComponent } from './info-card.component';

const meta: Meta<InfoCardComponent> = {
  component: InfoCardComponent,
  title: 'Card',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    alignIcon: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
interface StoryInfoCardProps {
  label: string;
  actionText: string;
  alignIcon: 'start' | 'end' | 'center';
}

type Story = StoryObj<InfoCardComponent & StoryInfoCardProps>;

export const SimpleInfoCard: Story = {
  render: (props) => ({
    props,
    template: `<ctr-info-card
    [label]="label"
    [actionText]="actionText"
    [alignIcon]="alignIcon"
     >
     <ng-container icon>info</ng-container>
     
     </ctr-info-card>`,
  }),
  args: {
    label: "You'll be able to program an order for when these are open",
    actionText: 'Got it',
    alignIcon: 'center',
  },
};
