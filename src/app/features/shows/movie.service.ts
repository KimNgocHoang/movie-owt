import { environment } from './../../../environments/environment';
import { MovieList } from './../../core/models/movie-list.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<MovieList> {
    return this.http
      .get<MovieList>(`${environment.apiHost}/movie/popular?page=1`)
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  getPopularMoviesBySearch(searchQuery: string): Observable<MovieList> {
    if (searchQuery) {
      return this.http
        .get<MovieList>(
          `${environment.apiHost}/search/movie?query=${searchQuery}`
        )
        .pipe(
          map((responseData) => {
            return camelcaseKeys(responseData, { deep: true });
          })
        );
    }
    return this.getPopularMovies();
  }
}
