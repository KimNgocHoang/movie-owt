import { MaterialModule } from './material/material.module';
import { ShowsModule } from './features/shows/shows.module';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutRoutingModule } from './share/layout/layout-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    LayoutRoutingModule,
    ShareModule,
    ShowsModule,
    CoreModule,
    MaterialModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
