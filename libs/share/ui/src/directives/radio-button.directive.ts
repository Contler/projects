import { Directive } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Directive({
  selector: '[ctrRadioButton]',
  standalone: true,
})
export class RadioButtonDirective {
  hotelColor: string = '#000';
  unsubscribe$ = new Subject<void>();

  constructor(
    private elementRef: MatRadioButton,
    private store: Store,
  ) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => {
        this.hotelColor = hotel?.color || this.hotelColor;
        this.setColor();
      });
  }

  setColor() {
    const element = this.elementRef._elementRef.nativeElement as HTMLElement;
    element.style.setProperty('--mat-radio-checked-ripple-color', this.hotelColor);
    element.style.setProperty('--mdc-radio-selected-hover-icon-color', this.hotelColor);
    element.style.setProperty('--mdc-radio-selected-icon-color', this.hotelColor);
    element.style.setProperty('--mdc-radio-selected-pressed-icon-color', this.hotelColor);
  }
}
