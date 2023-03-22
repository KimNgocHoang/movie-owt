import { I18nService } from './../../services/i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  code: string;
  languages = this.i18nService.languages;

  constructor(
    public translate: TranslateService,
    private i18nService: I18nService
  ) {
    this.code = localStorage.getItem('locale');
  }

  changeSiteLanguage(localeCode: string): void {
    this.i18nService.changeLocale(localeCode);
  }
}
