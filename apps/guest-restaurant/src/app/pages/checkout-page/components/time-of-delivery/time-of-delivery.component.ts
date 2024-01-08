import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TimeOfDelivery } from '@contler/core/restaurants';
import { ModalContainerComponent, SelectOptionComponent } from '@contler/ui';
import { NgxMaterialTimepickerModule, NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';

@Component({
  selector: 'contler-time-of-delivery',
  standalone: true,
  imports: [CommonModule, ModalContainerComponent, SelectOptionComponent, NgxMaterialTimepickerModule],
  templateUrl: './time-of-delivery.component.html',
  styleUrl: './time-of-delivery.component.scss',
})
export class TimeOfDeliveryComponent implements AfterViewInit {
  @ViewChild('picker') timepicker!: NgxMaterialTimepickerComponent;
  timeOfDelivery: TimeOfDelivery = {
    option: 0,
    time: new Date(),
  };
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: TimeOfDelivery,
    private _bottomSheetRef: MatBottomSheetRef<TimeOfDeliveryComponent>,
  ) {
    this.timeOfDelivery = data;
    console.log(this.timepicker);
  }

  close() {
    this._bottomSheetRef.dismiss(this.timeOfDelivery);
  }

  openPicker() {
    this.timepicker.open();
    this._bottomSheetRef.dismiss();
  }

  ngAfterViewInit(): void {
    this.timepicker.closed.subscribe(() => {
      console.log('closed');
    });
  }
}
