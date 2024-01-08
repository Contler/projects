import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ctr-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  hotelImage: string | undefined = '';
  constructor(private store: Store) {
    this.store.select(hotelFeature.selectHotel).subscribe((hotel) => {
      this.hotelImage = hotel?.logo;
    });
  }
}
