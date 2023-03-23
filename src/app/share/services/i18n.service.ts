import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService) {}

  changeLocale(localeCode: string) {
    this.translate.use(localeCode);
    localStorage.setItem('locale', localeCode);
  }
}
