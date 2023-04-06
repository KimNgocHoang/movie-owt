import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TvShowListComponent } from './pages/tv-shows/tv-show-list/tv-show-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { ListsComponent } from '../my-lists/pages/lists/lists.component';

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
    path: 'my-lists',
    component: ListsComponent,
    loadChildren: () =>
      import('../../features/my-lists/my-lists.module').then(
        (m) => m.MyListsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsRoutingModule {}
