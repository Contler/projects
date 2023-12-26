import { Component, inject, OnInit } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SpinnerHotelDirective } from '@contler/ui';
import { RestaurantsService } from '@contler/core/restaurants';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUser } from '@contler/configState';

@Component({
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, SpinnerHotelDirective],
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
        this.store.dispatch(loadUser({ id: user!.uid }));
      });
  }

  changeRouter() {
    this.isLoading = false;
  }
}
