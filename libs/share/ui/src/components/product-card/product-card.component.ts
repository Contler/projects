import { ScrollDispatcher } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
export class ProductCardComponent implements AfterViewInit, OnDestroy {
  @Input() imageUrl: string | undefined = '';
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';
  @Input() subtitle: string | null | undefined = '';
  @Output() openCard = new EventEmitter<void>();
  isVisible = false;
  private observer: IntersectionObserver | undefined;

  constructor(
    private scroll: ScrollDispatcher,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    const items = this.scroll.getAncestorScrollContainers(this.elementRef.nativeElement);
    if (items.length > 0) {
      const parentRef = items[0];
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true;
            }
          });
        },
        {
          root: parentRef.getElementRef().nativeElement,
          threshold: 0.1,
        },
      );
      this.observer.observe(this.elementRef.nativeElement);
    } else {
      this.isVisible = true;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  clickCard() {
    this.openCard.emit();
  }
}
