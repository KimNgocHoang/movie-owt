import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  languagesCodeEn = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Vietnamese',
      code: 'vi',
    },
  ];
  languagesCodeVi = [
    {
      name: 'Tiếng Anh',
      code: 'en',
    },
    {
      name: 'Tiếng Việt',
      code: 'vi',
    },
  ];
  languages = [];
  constructor(private translate: TranslateService) {
    this.translate.currentLang == 'vi'
      ? (this.languages = this.languagesCodeVi)
      : (this.languages = this.languagesCodeEn);
  }

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
