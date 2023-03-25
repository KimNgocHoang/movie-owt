import { SuggestMeComponent } from './pages/suggest-me/suggest-me.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TvShowListComponent } from './pages/tv-show-list/tv-show-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movies',
    component: MovieListComponent,
    children: [{ path: ':id', component: MovieDetailsComponent }],
  },
  {
    path: 'tv',
    component: TvShowListComponent,
    children: [{ path: ':id', component: TvShowDetailsComponent }],
  },
  {
    path: 'suggest-me',
    component: SuggestMeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsRoutingModule {}
