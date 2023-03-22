import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../share/services/i18n.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  code: string;
  languages = this.i18nService.languages;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private i18nService: I18nService
  ) {
    this.code = localStorage.getItem('locale');
  }

  backHome() {
    this.router.navigate(['/shows']);
  }
  changeSiteLanguage(localeCode: string): void {
    this.i18nService.changeLocale(localeCode);
  }
}
