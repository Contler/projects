import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { hotelFeature, HotelModel } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { SpinnerHotelDirective } from '../../directives/spinner-hotel.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ctrStrokedButton]',
  standalone: true,
  imports: [CommonModule, MatRippleModule, MatProgressSpinnerModule, SpinnerHotelDirective],
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrokedButtonComponent implements AfterViewInit {
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
    this.elementRef.nativeElement.style.setProperty('--ctr-btn-color', color);
    this.elementRef.nativeElement.style.setProperty('--ctr-btn-text-color', color);
  }
}
