import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TvShowListComponent } from './pages/tv-shows/tv-show-list/tv-show-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { MyListsComponent } from './pages/suggest-me/my-lists/my-lists.component';
import { MyListCreateComponent } from './pages/my-list-create/my-list-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    children: [
      { path: '', component: MovieListComponent },
      { path: ':id', component: MovieDetailsComponent },
    ],
  },
  {
    path: 'tv-shows',
    component: TvShowsComponent,
    children: [
      { path: '', component: TvShowListComponent },
      { path: ':id', component: TvShowDetailsComponent },
    ],
  },
  {
    path: 'suggest-me',
    component: SuggestMeComponent,
    children: [
      { path: '', component: MyListsComponent },
      { path: 'create-list', component: MyListCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsRoutingModule {}
