import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerHotelDirective } from '../directives/spinner-hotel.directive';
import { MatRippleModule } from '@angular/material/core';

/**
 * Component for a custom button with loading state.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ctrButton]',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpinnerHotelDirective, MatRippleModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /**
   * Whether the button is in loading state.
   */
  @Input() load = false;

  /**
   * Prevents the default behavior of the button when it's loader.
   * @param $event
   */
  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    if (this.load) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }
}
