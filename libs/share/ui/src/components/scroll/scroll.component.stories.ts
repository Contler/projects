import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

import { ScrollItemComponent } from './components/scroll-item.component';
import { ScrollComponent } from './scroll.component';

@Component({
  selector: 'ctr-helper-scroll',
  standalone: true,
  imports: [CommonModule, ScrollComponent, ScrollItemComponent],
  template: `
    <h2>Item active {{ itemActive }}</h2>
    <div style="display: flex; gap: 20px">
      <button style="border: 1px solid" (click)="scroll.scrollElement('1')">Go to 1</button>
      <button style="border: 1px solid" (click)="scroll.scrollElement('2')">Go to 2</button>
      <button style="border: 1px solid" (click)="scroll.scrollElement('3')">Go to 3</button>
      <button style="border: 1px solid" (click)="scroll.scrollElement('4')">Go to 4</button>
      <button style="border: 1px solid" (click)="scroll.scrollElement('5')">Go to 5</button>
    </div>
    <ctr-scroll [height]="height" #scroll>
      <ctr-scroll-item key="1" (activeItem)="itemActive = 1">
        <div style="height: 200px; background: red;">1</div>
      </ctr-scroll-item>
      <ctr-scroll-item key="2" (activeItem)="itemActive = 2">
        <div style="height: 200px; background: blue;">2</div>
      </ctr-scroll-item>
      <ctr-scroll-item key="3" (activeItem)="itemActive = 3">
        <div style="height: 200px; background: green;">3</div>
      </ctr-scroll-item>
      <ctr-scroll-item key="4" (activeItem)="itemActive = 4">
        <div style="height: 200px; background: yellow;">4</div>
      </ctr-scroll-item>
      <ctr-scroll-item key="5" (activeItem)="itemActive = 5">
        <div [style.height]="height" style="background: orange;">5</div>
      </ctr-scroll-item>
    </ctr-scroll>
  `,
})
class HelperComponent {
  @Input() height = '300px';
  itemActive = 1;
}

const meta: Meta<HelperComponent> = {
  component: HelperComponent,
  title: 'Scrolls',
};
export default meta;
type Story = StoryObj<HelperComponent>;

export const Primary: Story = {
  args: {
    height: '300px',
  },
};
