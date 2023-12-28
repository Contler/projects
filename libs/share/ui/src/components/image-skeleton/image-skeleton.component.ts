import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SkeletonAppearance } from './skeleton-apperance';

@Component({
  selector: 'ctr-image-skeleton',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './image-skeleton.component.html',
  styleUrl: './image-skeleton.component.scss',
})
export class ImageSkeletonComponent {
  @Input() imageUrl: string = '';
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() borderRadius: string = '0';
  @Input() skeletonAppearance: SkeletonAppearance = SkeletonAppearance.CIRCLE;
  isLoading: boolean = true;

  onLoad() {
    this.isLoading = false;
  }
}
