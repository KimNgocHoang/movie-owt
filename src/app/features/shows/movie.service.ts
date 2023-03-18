import { environment } from './../../../environments/environment';
import { MovieList } from './../../core/models/movie-list.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getPopularMoviesBySearch(queryStr: Query): Observable<MovieList> {
    let urlMain: string;
    if (queryStr.query) {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/search/movie`,
          query: queryStr,
        },
        { skipNull: true }
      );
    } else {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/movie/popular`,
          query: queryStr,
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
}
export type Query = {
  query: string;
  page: number;
};
