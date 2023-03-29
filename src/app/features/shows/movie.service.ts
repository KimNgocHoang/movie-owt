import { environment } from './../../../environments/environment';
import { MovieList } from './../../core/models/movie-list.model';
import { SearchMoviesRequest } from './type/search-movies-request.type';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { Movie } from './../../core/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getPopularMoviesBySearch(
    request: SearchMoviesRequest
  ): Observable<MovieList> {
    let urlMain: string;
    if (request.query) {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/search/movie`,
          query: request,
        },
        { skipNull: true }
      );
    } else {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/movie/popular`,
          query: request,
        },
        { skipNull: true }
      );
    }
    return this.http.get<MovieList>(urlMain).pipe(
      map((responseData) => {
        return camelcaseKeys(responseData, { deep: true });
      })
    );
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiHost}/movie/${id}`).pipe(
      map((responseData) => {
        return camelcaseKeys(responseData, { deep: true });
      })
    );
  }
}
