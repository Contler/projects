import { AfterViewChecked, Directive, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[ctrRadioButton]',
  standalone: true,
})
export class RadioButtonDirective implements AfterViewChecked, OnDestroy, OnChanges {
  hotelColor: string = '#000';
  unsubscribe$ = new Subject<void>();

  constructor(
    private elementRef: MatRadioButton,
    private renderer2: Renderer2,
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
    this.elementRef.change.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.setColor());
    this.setColor();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(): void {
    this.setColor();
  }

  setColor() {
    if (this.elementRef.checked) {
      this.renderer2.setStyle(this.outlineRef, 'border-color', this.hotelColor);
      this.renderer2.setStyle(this.innerRef, 'border-color', this.hotelColor);
    } else {
      this.renderer2.setStyle(this.outlineRef, 'border-color', '#ccc');
      this.renderer2.setStyle(this.innerRef, 'border-color', '#ccc');
    }
  }

  get outlineRef() {
    return this.elementRef._elementRef.nativeElement.children[0].children[0].children[2].children[0];
  }

  get innerRef() {
    return this.elementRef._elementRef.nativeElement.children[0].children[0].children[2].children[1];
  }

  get rippleRef() {
    return this.elementRef._elementRef.nativeElement.children[0].children[0].children[3];
  }
}
