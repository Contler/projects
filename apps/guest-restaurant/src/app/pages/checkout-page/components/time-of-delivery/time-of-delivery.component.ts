import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { RoomService, hotelFeature } from '@contler/core/hotel';
import { TimeOfDelivery } from '@contler/core/restaurants';
import { ModalContainerComponent, SelectOptionComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { filter, first } from 'rxjs';

import { TimeSelectorComponent } from '../time-selector/time-selector.component';

@Component({
  selector: 'contler-time-of-delivery',
  standalone: true,
  imports: [CommonModule, ModalContainerComponent, SelectOptionComponent, NgxMaterialTimepickerModule, TranslateModule],
  templateUrl: './time-of-delivery.component.html',
  styleUrl: './time-of-delivery.component.scss',
})
export class TimeOfDeliveryComponent {
  roomService: RoomService | undefined;
  timeOfDeliveryControl = new FormGroup({
    option: new FormControl<number>(0),
    time: new FormControl<Date>(new Date()),
  });
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: TimeOfDelivery,
    private _bottomSheetRef: MatBottomSheetRef<TimeOfDeliveryComponent>,
    private matDialog: MatDialog,
    private store: Store,
  ) {
    this.timeOfDeliveryControl.patchValue(data);
    this.store
      .select(hotelFeature.selectHotelConfig)
      .pipe(
        filter((config) => !!config),
        first(),
      )
      .subscribe((config) => {
        this.roomService = config?.serviceCost.roomService;
      });
  }

  close() {
    this._bottomSheetRef.dismiss(this.timeOfDeliveryControl.value);
  }

  setAsSoonAsPossible() {
    this.timeOfDeliveryControl.patchValue({ option: 0, time: new Date() });
  }

  openPicker() {
    this.matDialog
      .open(TimeSelectorComponent, {
        minWidth: '250px',
      })
      .afterClosed()
      .subscribe((time) => {
        if (time) {
          this.timeOfDeliveryControl.patchValue({ time, option: 1 });
        }
      });
  }

  get selectedOption() {
    return this.timeOfDeliveryControl.get('option')?.value;
  }

  get time() {
    return this.timeOfDeliveryControl.get('time')?.value;
  }
}
