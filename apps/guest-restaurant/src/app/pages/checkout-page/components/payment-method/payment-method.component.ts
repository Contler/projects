import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PAYMENT_OPTIONS, PaymentMethod } from '@contler/core/restaurants';
import { ModalContainerComponent, SelectOptionComponent } from '@contler/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'contler-payment-method',
  standalone: true,
  imports: [CommonModule, TranslateModule, SelectOptionComponent, ModalContainerComponent],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent {
  paymentOptions = PAYMENT_OPTIONS;
  selectedPayment: PaymentMethod = PaymentMethod.chargeToTheRoom;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: PaymentMethod,
    private _matBottomSheetRef: MatBottomSheetRef<PaymentMethodComponent>,
  ) {
    if (data) {
      this.selectedPayment = data;
    }
  }

  selectPayment(payment: PaymentMethod) {
    this.selectedPayment = payment;
    this._matBottomSheetRef.dismiss(payment);
  }
}
