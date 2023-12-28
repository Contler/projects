import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { HotelModel, hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Directive({
  selector: '[ctrHotelColor]',
  standalone: true,
})
export class HotelColorDirective implements OnChanges {
  @Input() ctrHotelColor: 'primary' | 'second' | '' = 'primary';
  private hotel: HotelModel | null = null;
  constructor(
    private store: Store,
    private elementRef: ElementRef,
  ) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => {
        this.hotel = hotel;
        this.setColor();
      });
  }
  ngOnChanges(): void {
    if (this.hotel) {
      this.setColor();
    }
  }

  private setColor() {
    this.elementRef.nativeElement!.style.color =
      this.ctrHotelColor === 'primary' || this.ctrHotelColor === '' ? this.hotel?.color : this.hotel?.colorSecond;
  }
}
