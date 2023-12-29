import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { getContrastingColor } from '../../utils/contrat-color';
import { rgbToRgba } from '../../utils/rgbToRgba';

@Component({
  selector: 'ctr-chip',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() active = false;
  @Output() action: EventEmitter<void> = new EventEmitter();
  hotelColor: string = '#000000';
  rippleColor: string = 'rgba(255, 255, 255, 0.3)';

  constructor(private store: Store) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => {
        this.hotelColor = hotel?.color || this.hotelColor;
        const contrastColor = getContrastingColor(this.hotelColor);
        this.rippleColor = rgbToRgba(contrastColor, 0.3);
      });
  }

  clickChip() {
    this.action.emit();
  }
}
