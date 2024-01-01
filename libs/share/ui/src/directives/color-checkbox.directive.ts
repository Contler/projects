import { AfterViewChecked, Directive, OnDestroy, Renderer2 } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';

@Directive({
  selector: '[ctrColorCheckbox]',
  standalone: true,
})
export class ColorCheckboxDirective implements AfterViewChecked, OnDestroy {
  unsubscribe$ = new Subject<void>();
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

  ngAfterViewChecked(): void {
    this.elementRef.change.pipe(take(1)).subscribe(() => this.setColor());
    this.setColor();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setColor() {
    this.renderer.setStyle(this.rippleRef, 'background-color', this.hotelColor);
    if (this.elementRef.checked) {
      this.renderer.setStyle(this.innerRef, 'background-color', this.hotelColor);
      this.renderer.setStyle(this.innerRef, 'border', '1.5px solid ' + this.hotelColor);
    } else {
      this.renderer.setStyle(this.innerRef, 'background-color', 'white');
      this.renderer.setStyle(this.innerRef, 'border', '1.5px solid #D9D9D9');
    }
  }

  get rippleRef() {
    return this.elementRef._elementRef.nativeElement.children[0].children[0].children[2];
  }

  get innerRef() {
    return this.elementRef._elementRef.nativeElement.children[0].children[0].children[3];
  }
}
