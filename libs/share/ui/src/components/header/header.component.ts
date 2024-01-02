import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@contler/utils';
import { TranslateModule } from '@ngx-translate/core';
import { first, forkJoin, map } from 'rxjs';

import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'ctr-header',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ImageSkeletonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title: string | null = '';
  @Input() imageUrl: string | undefined;
  @Input() backUrl: string | undefined;
  private url: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
  ) {
    const currentNavigation = this.router.getCurrentNavigation();

    forkJoin([
      this.route.url.pipe(
        first(),
        map((segments) => segments.join('/') as string),
      ),
      this.route.queryParams.pipe(
        first(),
        map((params) => params['backUrl']),
      ),
    ]).subscribe(([url, backQuery]) => {
      this.url = url;
      if (currentNavigation?.extras.state) {
        this.navigationService.setNavigation(this.url, currentNavigation.extras.state['backUrl']);
      } else if (backQuery) {
        this.navigationService.setNavigation(this.url, backQuery);
      }
    });
  }

  goBack() {
    const backDirection = this.navigationService.getNavigation(this.url);
    if (backDirection) {
      this.router.navigate([backDirection]);
    } else if (this.backUrl) {
      window.location.href = this.backUrl;
    } else {
      console.log(window.history.state);
      window.history.back();
    }
  }

  goMenu() {}
}
