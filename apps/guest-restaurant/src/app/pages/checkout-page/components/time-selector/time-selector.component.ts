import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@contler/ui';
import { IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'contler-time-selector',
  standalone: true,
  imports: [CommonModule, IonDatetime, FormsModule, ButtonComponent],
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss',
})
export class TimeSelectorComponent {
  constructor(private _matDialogRef: MatDialogRef<TimeSelectorComponent>) {}
  time: string | undefined;

  close() {
    if (this.time) {
      this._matDialogRef.close(new Date(this.time));
    }
  }
}
