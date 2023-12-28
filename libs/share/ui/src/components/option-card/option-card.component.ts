import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'ctr-option-card',
  standalone: true,
  imports: [CommonModule, ImageSkeletonComponent, MatIconModule, MatRippleModule],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.scss',
})
export class OptionCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
}
