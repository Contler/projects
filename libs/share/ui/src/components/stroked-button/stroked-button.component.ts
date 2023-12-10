import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerHotelDirective } from '@contler/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ctrStrokedButton]',
  standalone: true,
  imports: [CommonModule, MatRippleModule, MatProgressSpinnerModule, SpinnerHotelDirective],
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrokedButtonComponent {
  @Input() load = false;
}
