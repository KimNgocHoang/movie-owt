import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { Movie } from 'src/app/core/models/movie.model';
import { ShowList } from 'src/app/core/models/show-list.model';
import { SearchRequest } from './type/search-request.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getPopularMoviesBySearch(
    request: SearchRequest
  ): Observable<ShowList<Movie>> {
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
    return this.http.get<ShowList<Movie>>(urlMain).pipe(
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
