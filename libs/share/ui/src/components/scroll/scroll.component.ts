import { CdkScrollable } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'ctr-scroll',
  standalone: true,
  imports: [CommonModule, CdkScrollable],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollable: ElementRef<HTMLElement> | undefined;
  @Input() height = '0px';
  canEmmit = true;

  get stoppedScrolled$() {
    return this.stoppedScrolled.asObservable();
  }
  private stoppedScrolled = new Subject<HTMLElement>();

  ngAfterViewInit(): void {
    if (this.scrollable?.nativeElement) {
      fromEvent(this.scrollable?.nativeElement, 'scroll')
        .pipe(debounceTime(100))
        .subscribe(() => {
          this.canEmmit = true;
          if (this.scrollable?.nativeElement) {
            this.stoppedScrolled.next(this.scrollable.nativeElement);
          }
        });
    }
  }

  scrollElement(key: string) {
    const element = document.getElementById(`scroll-item-${key}`);
    if (element) {
      this.canEmmit = false;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
