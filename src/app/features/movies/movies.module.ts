import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { MovieDetailsComponent } from './pages/details/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/details/tv-show-details/tv-show-details.component';
import { MovieListComponent } from './pages/list/movie-list/movie-list.component';
import { TvShowListComponent } from './pages/list/tv-show-list/tv-show-list.component';

@NgModule({
  declarations: [
    MoviesListItemComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    MovieListComponent,
    TvShowListComponent,
  ],
  imports: [CommonModule, ShareModule],
})
export class MoviesModule {}
