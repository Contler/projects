import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { HotelColorDirective } from '../../directives/text-hotel-color.directive';
import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'ctr-item-card',
  standalone: true,
  imports: [CommonModule, ImageSkeletonComponent, HotelColorDirective, MatRippleModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() imageUrl: string | undefined = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() subtitle: string | null = '';
}
