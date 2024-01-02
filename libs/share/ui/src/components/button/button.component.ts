import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { hotelFeature, HotelModel } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { SpinnerHotelDirective } from '../../directives/spinner-hotel.directive';
import { getContrastingColor } from '../../utils/contrat-color';

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
export class ButtonComponent implements AfterViewInit {
  /**
   * Whether the button is in loading state.
   */
  @Input() load = false;

  constructor(
    private store: Store,
    private elementRef: ElementRef<HTMLButtonElement>,
  ) {}

  ngAfterViewInit(): void {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => this.setColor(hotel as HotelModel));
  }

  private setColor(hotel: HotelModel) {
    const color = hotel.color;
    const opposite = getContrastingColor(color);
    this.elementRef.nativeElement.style.setProperty('--ctr-btn-color', color);
    this.elementRef.nativeElement.style.setProperty('--ctr-btn-text-color', opposite);
  }

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
