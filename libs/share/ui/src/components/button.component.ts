import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerHotelDirective } from '../directives/spinner-hotel.directive';

/**
 * Component for a custom button with loading state.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ctrBbutton]',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpinnerHotelDirective],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  /**
   * Whether the button is in loading state.
   */
  @Input() load = false;

  private hostHeight: string;
  private hostWidth: string;

  /**
   * Creates an instance of ButtonComponent.
   * @param elementRef Reference to the element where the component is attached.
   * @param renderer Renderer to manipulate the element styles.
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.hostHeight = this.elementRef.nativeElement.offsetHeight + 'px';
    this.hostWidth = this.elementRef.nativeElement.offsetWidth + 'px';
  }

  /**
   * Called whenever an input property changes.
   */
  ngOnChanges() {
    if (!this.load) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'height');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
    } else {
      this.hostHeight = this.elementRef.nativeElement.offsetHeight + 'px';
      this.hostWidth = this.elementRef.nativeElement.offsetWidth + 'px';
      this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.hostHeight);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.hostWidth);
    }
  }
}
