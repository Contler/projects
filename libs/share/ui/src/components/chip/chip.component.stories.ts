import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  component: ChipComponent,
  title: 'Chip',
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
interface StoryChipProps {
  text: string;
  active: boolean;
}

type Story = StoryObj<ChipComponent & StoryChipProps>;

export const SimpleChip: Story = {
  render: (props) => ({
    props,
    template: `<ctr-chip
    [text]="text"
    [active]="active"
     ></ctr-chip>`,
  }),
  args: {
    text: 'Entradas',
    active: true,
  },
};
