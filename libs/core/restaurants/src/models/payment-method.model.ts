export enum PaymentMethod {
  cash = 'typeOfPayment.cash',
  card = 'typeOfPayment.creditCard',
  chargeToTheRoom = 'typeOfPayment.chargeToTheRoom',
}

export const PAYMENT_OPTIONS = [PaymentMethod.cash, PaymentMethod.card, PaymentMethod.chargeToTheRoom];
