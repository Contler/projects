import { Component, inject, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SpinnerHotelDirective } from '@contler/ui';


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

  ngOnInit(): void {
    user(this.auth).subscribe(console.log);
  }

  changeRouter() {
    this.isLoading = false;
  }
}
