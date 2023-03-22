import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  languages = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Tiếng Việt',
      code: 'vi',
    },
  ];
  constructor(private translate: TranslateService) {}

  changeLocale(localeCode: string) {
    const selectedLanguage = this.languages
      .find((language) => language.code === localeCode)
      ?.name.toString();
    if (selectedLanguage) {
      this.translate.use(localeCode);
      localStorage.setItem('locale', localeCode);
    }
  }
}
