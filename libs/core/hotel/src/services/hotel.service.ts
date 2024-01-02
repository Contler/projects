import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { API_URL, AuthHttpHandleService } from '@contler/utils';

import { HotelConfigModel, HotelModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private http: HttpClient;
  private db = inject(Firestore);

  constructor(
    private authHandle: AuthHttpHandleService,
    @Inject(API_URL) private apiUrl: string,
  ) {
    this.http = new HttpClient(this.authHandle);
  }

  getHotelByUser(userUid: string) {
    const url = new URL(`/hotel/user/${userUid}`, this.apiUrl);
    return this.http.get<HotelModel>(url.toString());
  }

  getHotel(hotelUid: string) {
    const url = new URL(`/hotel/${hotelUid}`, this.apiUrl);
    return this.http.get<HotelModel>(url.toString());
  }

  async getConfigHotel(hotelUid: string) {
    const docRef = doc(this.db, `hotelConfig/${hotelUid}`);
    const snap = await getDoc(docRef);
    return snap.data() as HotelConfigModel;
  }
}
