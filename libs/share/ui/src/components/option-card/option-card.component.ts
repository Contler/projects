import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'ctr-option-card',
  standalone: true,
  imports: [CommonModule, ImageSkeletonComponent, MatIconModule, MatRippleModule],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.scss',
})
export class OptionCardComponent {
  @Input() imageUrl: string | undefined = '';
  @Input() title: string | null = '';
  @Input() description: string | undefined = '';
  @Input() subtitle: string | undefined = '';
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

  clickCard() {
    this.action.emit();
  }
}
