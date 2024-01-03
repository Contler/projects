import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { HotelColorDirective } from '../../directives/text-hotel-color.directive';
import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';
import { SkeletonAppearance } from '../image-skeleton/skeleton-apperance';

@Component({
  selector: 'ctr-modal-container',
  standalone: true,
  imports: [CommonModule, ImageSkeletonComponent, MatIconModule, HotelColorDirective],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerContent') footerContentRef: ElementRef<HTMLElement> | undefined;
  @Input() imageUrl: string | undefined;
  @Input() title: string | undefined;
  @Output() closeModal = new EventEmitter<void>();
  footerHeight = 0;
  readonly skeletonType = SkeletonAppearance.LINE;
  private resizeObserver: ResizeObserver | undefined;

  ngAfterViewInit(): void {
    if (this.footerContentRef?.nativeElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.footerHeight = entry.contentRect.height;
        }
      });
      this.resizeObserver.observe(this.footerContentRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
