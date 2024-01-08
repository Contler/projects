import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule, NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'ctr-box-field',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, NgxMaterialTimepickerModule],
  templateUrl: './box-field.component.html',
  styleUrl: './box-field.component.scss',
})
export class BoxFieldComponent {
  @Input() label: string | undefined;
  @Input() description: string | undefined;
  @Input() title: string | undefined;
  @Output() action: EventEmitter<void> = new EventEmitter();

  theme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#000',
    },
    clockFace: {},
    dial: {
      dialBackgroundColor: '#000',
    }
  };

  clickBox(): void {
    this.action.emit();
  }
}
