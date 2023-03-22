import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './interceptor/api-key.interceptor';
import { LanguageInterceptor } from './interceptor/language.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShareModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
