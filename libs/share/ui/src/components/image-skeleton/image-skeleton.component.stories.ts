import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ImageSkeletonComponent } from './image-skeleton.component';
import { SkeletonAppearance } from './skeleton-apperance';

const SKELETON_APPEARANCE_OPTIONS = [
  SkeletonAppearance.CIRCLE,
  SkeletonAppearance.LINE,
  SkeletonAppearance.CUSTOM_CONTENT,
];

const meta: Meta<ImageSkeletonComponent> = {
  component: ImageSkeletonComponent,
  title: 'Images',
  argTypes: {
    skeletonAppearance: {
      options: SKELETON_APPEARANCE_OPTIONS,
      control: 'select',
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
  skeletonAppearance: SkeletonAppearance;
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
    skeletonAppearance: SkeletonAppearance.CIRCLE,
    borderRadius: '0',
    isLoading: true,
  },
};
