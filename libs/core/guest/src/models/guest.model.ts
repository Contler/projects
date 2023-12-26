export interface GuestModel {
  uid: string;
  active: boolean;
  name: string;
  token: null;
  lastName: string;
  email: string | null;
  phone: string | null;
  hotel: Hotel;
  hotelBooking: HotelBooking;
}

export interface Hotel {
  uid: string;
  name: string;
  color: string;
  colorSecond: string;
  colorText: string;
  colorTextSecond: string;
  outlineText: null;
  logo: string;
  city: string;
  country: string;
  state: boolean;
  initialConfiguration: boolean;
  orderText: null;
  currency: string;
}

export interface HotelBooking {
  id: number;
  checkIn: Date;
  checkOut: Date;
  room: Room;
}

export interface Room {
  uid: string;
  name: string;
  number: number;
}
