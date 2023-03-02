import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { TvShowListComponent } from './pages/tv-show-list/tv-show-list.component';

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
