import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ShowsModule } from './features/shows/shows.module';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutRoutingModule } from './share/layout/layout-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyListsModule } from './features/my-lists/my-lists.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    LayoutRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    ShareModule,
    MyListsModule,
    ShowsModule,
    CoreModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    if (localStorage.getItem('locale')) {
      translate.setDefaultLang(localStorage.getItem('locale'));
      translate.use(localStorage.getItem('locale'));
    } else {
      const browserLang = translate.getBrowserLang();
      if (browserLang.match(/en|fr/)) {
        translate.use(browserLang);
        localStorage.setItem('locale', browserLang);
      } else {
        translate.use('en');
        localStorage.setItem('locale', 'en');
      }
    }
  }
}
