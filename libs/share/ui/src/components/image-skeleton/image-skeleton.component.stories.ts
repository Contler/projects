import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ImageSkeletonComponent } from './image-skeleton.component';

const SKELETON_APPEARANCE_OPTIONS = ['circle', 'line', 'custom-content'];

const meta: Meta<ImageSkeletonComponent> = {
  component: ImageSkeletonComponent,
  title: 'Images',
  argTypes: {
    skeletonAppearance: {
      options: SKELETON_APPEARANCE_OPTIONS,
      control: 'select'
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};

export default meta;
interface StoryImageSkeletonProps {
  imageUrl: string;
  height: string;
  width: string;
  skeletonAppearance: 'circle' | 'line' | 'custom-content';
  borderRadius: string;
  isLoading: boolean;
}

type Story = StoryObj<ImageSkeletonComponent & StoryImageSkeletonProps>;

export const SimpleImageSkeleton: Story = {
  render: (props) => ({
    props,
    template: `<ctr-image-skeleton 
      [imageUrl]="imageUrl"
      [height]="height"
      [width]="width"
      [skeletonAppearance]="skeletonAppearance"
      [borderRadius]="borderRadius"
     ></ctr-image-skeleton>`,
  }),
  args: {
    imageUrl: 'https://storage.googleapis.com/contler-dev.appspot.com/RoomService.jpeg',
    height: '50px',
    width: '50px',
    skeletonAppearance: 'circle',
    borderRadius: '0',
    isLoading: true,
  },
};
