import { TranslatedMatPaginator } from './TranslatedMatPaginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: TranslatedMatPaginator }],
})
export class MaterialModule {}
