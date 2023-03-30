import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { TvShowListComponent } from './pages/tv-show-list/tv-show-list.component';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { ShowsRoutingModule } from './shows-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MovieItemSkeletonComponent } from './components/movie-item-skeleton/movie-item-skeleton.component';
import { FormsModule } from '@angular/forms';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsSkeletonComponent } from './components/movie-details-skeleton/movie-details-skeleton.component';
import { ShowListItemComponent } from './components/show-list-item/show-list-item.component';

@NgModule({
  declarations: [
    MoviesListItemComponent,
    HomeComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    TvShowListComponent,
    MovieListComponent,
    SuggestMeComponent,
    MovieItemSkeletonComponent,
    MoviesComponent,
    MovieDetailsSkeletonComponent,
    ShowListItemComponent,
  ],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    ShareModule,
    MaterialModule,
    FormsModule,
  ],
})
export class ShowsModule {}
