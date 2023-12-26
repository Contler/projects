import { Component, inject, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SpinnerHotelDirective } from '@contler/ui';
import { RestaurantsService } from '@contler/core/restaurants';


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

  constructor(private restService: RestaurantsService) {
  }

  ngOnInit(): void {}

  changeRouter() {
    this.isLoading = false;
  }
}
