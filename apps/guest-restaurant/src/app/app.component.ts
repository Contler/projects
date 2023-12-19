import { Component, inject, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MatProgressSpinnerModule],
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'guest-restaurant';
  private auth: Auth = inject(Auth);

  ngOnInit(): void {
    user(this.auth).subscribe(console.log);
  }
}
