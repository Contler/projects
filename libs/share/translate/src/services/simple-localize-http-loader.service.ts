import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class SimpleLocalizeHttpLoaderService implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private nameSpace: string,
  ) {}

  getTranslation(lang: string): Observable<unknown> {
    const projectToken = '86356ef03af844568958848219888ebe';
    const version = '_latest';

    return this.http.get(`https://cdn.simplelocalize.io/${projectToken}/${version}/${lang}/${this.nameSpace}`);
  }
}
