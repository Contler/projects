import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { OptionCardComponent } from './option-card.component';

const meta: Meta<OptionCardComponent> = {
  component: OptionCardComponent,
  title: 'Card',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};

export default meta;
interface StoryOptionCardProps {
  imageUrl: string;
  title: string;
}

type Story = StoryObj<OptionCardComponent & StoryOptionCardProps>;

export const SimpleOptionCard: Story = {
  render: (props) => ({
    props,
    template: `<ctr-option-card
      [imageUrl]="imageUrl"
      [title]="title"
     ></ctr-option-card>`,
  }),
  args: {
    imageUrl: 'https://storage.googleapis.com/contler-dev.appspot.com/RoomService.jpeg',
    title: 'Room Service',
  },
};
