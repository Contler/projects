import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ItemCardComponent } from './item-card.component';

const meta: Meta<ItemCardComponent> = {
  component: ItemCardComponent,
  title: 'Card',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};

export default meta;
interface StoryItemCardProps {
  imageUrl: string;
  title: string;
  description: string;
  subtitle: string;
}

type Story = StoryObj<ItemCardComponent & StoryItemCardProps>;

export const SimpleItemCard: Story = {
  render: (props) => ({
    props,
    template: `<ctr-item-card
      [imageUrl]="imageUrl"
      [title]="title"
      [description]="description"
      [subtitle]="subtitle"
     ></ctr-item-card>`,
  }),
  args: {
    imageUrl:
      'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
    title: 'Hamburgesa doble',
    description: 'Combo con doble carne, cebolla rústica, tomates, queso, lechuga y papas fritas...',
    subtitle: '$12.000 COP',
  },
};
