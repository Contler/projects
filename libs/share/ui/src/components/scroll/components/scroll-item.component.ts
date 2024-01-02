import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';

import { ScrollComponent } from '../scroll.component';

@Component({
  selector: 'ctr-scroll-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-item.component.html',
  styleUrl: './scroll-item.component.scss',
})
export class ScrollItemComponent implements AfterViewInit, OnInit, OnDestroy {
  @Output() activeItem = new EventEmitter<void>();
  @Input() key!: string;
  private actualOffset = 0;
  private subscribe: Subscription | undefined;

  constructor(
    @Host() private scrollComponent: ScrollComponent,
    private scroll: ScrollDispatcher,
    private elem: ElementRef<HTMLElement>,
  ) {}

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe = this.scrollComponent.stoppedScrolled$.pipe(debounceTime(200)).subscribe((parent) => {
      const parentTop = parent.getBoundingClientRect().top;
      const childTop = this.elem.nativeElement.getBoundingClientRect().top;

      const parentBottom = parent.getBoundingClientRect().bottom;
      const childBottom = this.elem.nativeElement.getBoundingClientRect().bottom;

      const position = childTop - parentTop;

      if (childTop <= parentTop && childBottom >= parentBottom) {
        this.activeItem.emit();
      } else if (position > 100 && position < -30) {
        this.activeItem.emit();
      }
    });
  }

  ngAfterViewInit(): void {
    this.scroll.ancestorScrolled(this.elem.nativeElement).subscribe((event) => {
      const data = event as CdkScrollable;

      if (!data || !this.scrollComponent.canEmmit) {
        return;
      }
      this.calculateActive(data.measureScrollOffset('top'), data.getElementRef().nativeElement);
    });
  }

  private calculateActive(scrollOffset: number, parent: HTMLElement) {
    const direction: 'up' | 'down' = scrollOffset > this.actualOffset ? 'down' : 'up';
    this.actualOffset = scrollOffset;

    const child = this.elem.nativeElement;
    const elementTop = child.getBoundingClientRect().top;
    const parentTop = parent.getBoundingClientRect().top;
    const positionTop = elementTop - parentTop;

    const elementBottom = child.getBoundingClientRect().bottom;
    const positionBottom = elementBottom - parentTop;
    if (direction === 'down' && positionTop < 100 && positionTop > -30) {
      this.activeItem.emit();
    } else if (direction === 'up' && positionBottom > 100 && positionBottom < 200) {
      this.activeItem.emit();
    }
  }
}
