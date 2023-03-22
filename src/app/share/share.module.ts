import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [MainLayoutComponent, SkeletonComponent, TranslateModule],
})
export class ShareModule {}
