import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ctr-box-field',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './box-field.component.html',
  styleUrl: './box-field.component.scss',
})
export class BoxFieldComponent {
  @Input() label: string | undefined;
  @Input() description: string | undefined;
  @Input() title: string | undefined;
  @Output() action: EventEmitter<void> = new EventEmitter();

  clickBox(): void {
    this.action.emit();
  }
}
