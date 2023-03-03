import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LayoutRoutingModule } from './layout/layout-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainLayoutComponent],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [MainLayoutComponent, HeaderComponent],
})
export class ShareModule {}
