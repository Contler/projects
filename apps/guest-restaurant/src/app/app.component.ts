import { Component, inject, OnInit } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { loadUser } from '@contler/configState';
import { loadHotel } from '@contler/core/hotel';
import { ButtonComponent, SpinnerHotelDirective, StrokedButtonComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store) {}

  ngOnInit(): void {
    user(this.auth)
      .pipe(
        filter((user) => !!user),
        map((user) => user as User),
      )
      .subscribe((user) => {
        this.store.dispatch(loadUser({ id: user.uid }));
        this.store.dispatch(loadHotel({ userUid: user.uid }));
      });
  }

  changeRouter() {
    this.isLoading = false;
  }
}
