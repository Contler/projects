import { provideStore } from '@ngrx/store';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ModalContainerComponent } from './modal-container.component';

const meta: Meta<ModalContainerComponent> = {
  component: ModalContainerComponent,
  title: 'ModalContainer',
  decorators: [
    applicationConfig({
      providers: [provideStore()],
    }),
  ],
};
export default meta;

type Story = StoryObj<ModalContainerComponent>;

export const ProductModal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ctr-modal-container [imageUrl]="imageUrl" [title]="title">
        <ng-container body>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
        </ng-container>

        <ng-container footer>
          <div style="padding: 16px;">
            footer section
          </div>
        </ng-container>
      </ctr-modal-container>
    `,
  }),
  args: {
    imageUrl: 'https://storage.googleapis.com/contler-dev.appspot.com/RoomService.jpeg',
    title: 'Modal Title',
  },
};
