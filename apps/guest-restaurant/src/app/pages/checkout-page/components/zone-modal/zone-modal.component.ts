import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { ZoneModel } from '@contler/core/restaurants';
import { ModalContainerComponent, SelectOptionComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

@Component({
  selector: 'contler-zone-modal',
  standalone: true,
  imports: [CommonModule, ModalContainerComponent, MatBottomSheetModule, MatIconModule, SelectOptionComponent],
  templateUrl: './zone-modal.component.html',
  styleUrl: './zone-modal.component.scss',
})
export class ZoneModalComponent {
  hotelColor: string | undefined;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      zones: ZoneModel[];
      selectedZone: ZoneModel;
    },
    private _bottomSheetRef: MatBottomSheetRef<ZoneModalComponent>,
    private store: Store,
  ) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => {
        this.hotelColor = hotel?.color;
      });
  }

  selectZone(zone: ZoneModel) {
    this._bottomSheetRef.dismiss(zone);
  }
}
