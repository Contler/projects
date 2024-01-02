import { inject, Pipe, PipeTransform } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, first, from, Observable, of, switchMap, tap } from 'rxjs';

import { getFireLoc } from '../utils/get-language';

@Pipe({
  name: 'dynamicTranslate',
  standalone: true,
})
export class DynamicTranslatePipe implements PipeTransform {
  private db = inject(Database);

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {}
  transform(value: string | undefined): Observable<string> {
    if (!value) {
      return of('');
    }

    const dic = localStorage['dynamicTranslate'];
    if (dic) {
      const dicObj = JSON.parse(dic);
      if (dicObj[value]) {
        return of(dicObj[value]);
      }
    }

    return this.getTranslation(value).pipe(
      tap((res) => {
        const dic = localStorage['dynamicTranslate'] ? JSON.parse(localStorage['dynamicTranslate']) : {};
        dic[value] = res;
        localStorage['dynamicTranslate'] = JSON.stringify(dic);
      }),
    );
  }

  private getTranslation(key: string): Observable<string> {
    return this.store.select(hotelFeature.selectHotel).pipe(
      filter((hotel) => !!hotel),
      first(),
      switchMap((hotel) => {
        const lang = getFireLoc(this.translate.currentLang);
        const refT = ref(this.db, `dictionary/${hotel!.uid}/${key}/${lang}`);
        return from(get(refT).then((snap) => snap.val() || ''));
      }),
    );
  }
}
