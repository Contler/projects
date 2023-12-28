import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ctr-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() label: string = '';
  @Input() actionText: string = '';
  @Output() action: EventEmitter<void> = new EventEmitter();

  onAction() {
    this.action.emit();
  }
}
