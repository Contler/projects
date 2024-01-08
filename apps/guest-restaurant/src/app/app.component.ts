import { Component, inject, OnInit } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { loadUser } from '@contler/configState';
import { hotelFeature, loadHotel, loadHotelByUser } from '@contler/core/hotel';
import { ButtonComponent, SpinnerHotelDirective, StrokedButtonComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, SpinnerHotelDirective, ButtonComponent, StrokedButtonComponent],
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoading = true;
  private auth: Auth = inject(Auth);

  constructor(
    private store: Store,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('en_US');
    this.translateService.use('en_US');
  }

  ngOnInit(): void {
    const syncData = localStorage['GetStorage'];
    if (syncData) {
      const data = JSON.parse(syncData);
      if ('hotelUid' in data) {
        this.store.dispatch(loadHotel({ hotelUid: data.hotelUid }));
      }
    }
    user(this.auth)
      .pipe(
        filter((user) => !!user),
        map((user) => user as User),
      )
      .subscribe((user) => {
        this.store.dispatch(loadUser({ id: user.uid }));
        this.store.dispatch(loadHotelByUser({ userUid: user.uid }));
      });

    this.store
      .select(hotelFeature.selectHotel)
      .pipe(filter((hotel) => !!hotel))
      .subscribe((hotel) => {
        document.body.style.setProperty('--mdc-outlined-text-field-focus-outline-color', hotel?.color || '#000');
        document.body.style.setProperty('--mat-radio-checked-ripple-color', hotel?.color || '#000');
      });
  }

  changeRouter() {
    this.isLoading = false;
  }
}
