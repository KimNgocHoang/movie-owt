import { TvShowListComponent } from './pages/tv-shows/tv-show-list/tv-show-list.component';
import { ShareModule } from './../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { ShowsRoutingModule } from './shows-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MovieItemSkeletonComponent } from './components/movie-item-skeleton/movie-item-skeleton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsSkeletonComponent } from './components/movie-details-skeleton/movie-details-skeleton.component';
import { ShowListItemComponent } from './components/show-list-item/show-list-item.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { SeasonListItemComponent } from './components/season-list-item/season-list-item.component';
import { ListsItemSkeletonComponent } from './components/lists-item-skeleton/lists-item-skeleton.component';
import { ToastComponent } from './components/toast/toast.component';
import { UserMovieListsComponent } from './pages/suggest-me/my-lists/my-lists.component';
import { UserMovieListCreateComponent } from './pages/my-list-create/my-list-create.component';
import { UserMovieListsItemComponent } from './components/my-lists-item/my-lists-item.component';

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
    ShowListComponent,
    TvShowsComponent,
    SeasonListItemComponent,
    UserMovieListsComponent,
    UserMovieListsItemComponent,
    UserMovieListCreateComponent,
    ListsItemSkeletonComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    ShareModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShowsModule {}
