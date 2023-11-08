import { ChangeDetectorRef, Directive, HostBinding } from '@angular/core';

/**
 * A directive that adds custom styling to a Material Design spinner element
 * with the `ctrSpinnerHotel` selector.
 */
@Directive({
  selector: 'mat-spinner[ctrSpinnerHotel]',
  standalone: true,
})
export class SpinnerHotelDirective {
  /**
   * The color of the spinner's active indicator.
   */
  @HostBinding('style.--mdc-circular-progress-active-indicator-color') color = '#fff';

  constructor(private cdr: ChangeDetectorRef) {}
}
