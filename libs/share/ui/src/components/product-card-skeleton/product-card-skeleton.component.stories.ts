import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ProductCardSkeletonComponent } from './product-card-skeleton.component';

const meta: Meta<ProductCardSkeletonComponent> = {
  component: ProductCardSkeletonComponent,
  title: 'Card',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};

export default meta;
interface StoryProductCardSkeletonProps {}

type Story = StoryObj<ProductCardSkeletonComponent & StoryProductCardSkeletonProps>;

export const SimpleProductCardSkeleton: Story = {
  render: (props) => ({
    props,
    template: `<ctr-product-card-skeleton
     ></ctr-product-card-skeleton>`,
  }),
};
