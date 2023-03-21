import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  siteLanguage: string;
  code: string;
  public languages = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Vietnamese',
      code: 'vi',
    },
  ];

  constructor(public translate: TranslateService) {
    this.code = localStorage.getItem('locale');
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languages
      .find((language) => language.code === localeCode)
      ?.name.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.code = localeCode;
      this.translate.use(localeCode);
      localStorage.setItem('locale', localeCode);
    }
  }
}
