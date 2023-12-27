import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { hotelFeature, HotelModel } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { getContrastingColor } from '../utils/contrat-color';

/**
 * A directive that adds custom styling to a Material Design spinner element
 * with the `ctrSpinnerHotel` selector.
 */
@Directive({
  selector: 'mat-spinner[ctrSpinnerHotel]',
  standalone: true,
})
export class SpinnerHotelDirective implements AfterViewInit {
  /**
   * The color of the spinner's active indicator.
   */
  @HostBinding('style.--mdc-circular-progress-active-indicator-color') colorSpinner = '#171717';
  @Input() useContrastColor = false;
  private color: string | undefined;
  private opposite: string | undefined;

  constructor(private cdr: ChangeDetectorRef, private store: Store, private elementRef: ElementRef<HTMLElement>) {}

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
    this.color = hotel.color;
    this.opposite = getContrastingColor(this.color);
    this.elementRef.nativeElement.style.setProperty(
      '--mdc-circular-progress-active-indicator-color',
      this.useContrastColor ? this.opposite : this.color,
    );
    this.cdr.detectChanges();
  }
}
