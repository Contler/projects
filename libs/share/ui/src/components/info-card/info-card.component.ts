import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Component({
  selector: 'ctr-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() label: string = '';
  @Input() actionText: string = '';
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

  onAction() {
    this.action.emit();
  }
}
