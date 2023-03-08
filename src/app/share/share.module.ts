import { NotFoundComponent } from './../features/shows/pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [MainLayoutComponent, HeaderComponent],
})
export class ShareModule {}
