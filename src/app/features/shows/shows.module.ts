import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { TvShowListComponent } from './pages/tv-show-list/tv-show-list.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { ShowsRoutingModule } from './shows-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    MoviesListItemComponent,
    HomeComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    TvShowListComponent,
    MovieListComponent,
    SuggestMeComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, ShowsRoutingModule, ShareModule, MaterialModule],
})
export class ShowsModule {}
