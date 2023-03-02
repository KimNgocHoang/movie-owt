import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './pages/details/details.component';
import { ListComponent } from './pages/list/list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';



@NgModule({
  declarations: [
    DetailsComponent,
    ListComponent,
    MovieItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MoviesModule { }
