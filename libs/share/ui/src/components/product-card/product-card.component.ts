import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { HotelColorDirective } from '../../directives/text-hotel-color.directive';
import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'ctr-product-card',
  standalone: true,
  imports: [CommonModule, ImageSkeletonComponent, HotelColorDirective, MatRippleModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() imageUrl: string | undefined = '';
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';
  @Input() subtitle: string | null | undefined = '';
}
