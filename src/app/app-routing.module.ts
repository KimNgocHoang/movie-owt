import { HomeComponent } from './features/movies/pages/home/home.component';
import { TvShowDetailsComponent } from './features/movies/pages/tv-show-details/tv-show-details.component';
import { TvShowListComponent } from './features/movies/pages/tv-show-list/tv-show-list.component';
import { MovieDetailsComponent } from './features/movies/pages/movie-details/movie-details.component';
import { MovieListComponent } from './features/movies/pages/movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MovieListComponent,
    children: [{ path: ':id', component: MovieDetailsComponent }],
  },
  {
    path: 'tv-show',
    component: TvShowListComponent,
    children: [{ path: ':id', component: TvShowDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
