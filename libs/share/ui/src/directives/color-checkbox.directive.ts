import { Directive, Renderer2 } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';

@Directive({
  selector: '[ctrColorCheckbox]',
  standalone: true,
})
export class ColorCheckboxDirective {
  hotelColor: string = '#000';

  constructor(
    private elementRef: MatCheckbox,
    private renderer: Renderer2,
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
    element.style.setProperty('--mdc-checkbox-selected-icon-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-hover-state-layer-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-hover-icon-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-focus-state-layer-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-focus-icon-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-pressed-state-layer-color', this.hotelColor);
    element.style.setProperty('--mdc-checkbox-selected-pressed-icon-color', this.hotelColor);
  }
}
