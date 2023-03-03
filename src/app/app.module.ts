import { ShowsModule } from './features/shows/shows.module';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutRoutingModule } from './share/layout/layout-routing.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    RouterModule.forRoot([]),
    LayoutRoutingModule,
    ShareModule,
    ShowsModule,
    CoreModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
