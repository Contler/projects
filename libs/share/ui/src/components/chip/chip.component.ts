import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Component({
  selector: 'ctr-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() text: string = '';
  @Input() active = false;
  @Output() action: EventEmitter<void> = new EventEmitter();
  hotelColor: string = '#000';

  constructor(private store: Store) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => (this.hotelColor = hotel?.color || this.hotelColor));
  }

  clickChip() {
    this.action.emit();
  }
}
