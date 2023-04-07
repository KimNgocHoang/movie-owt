import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { SearchRequest } from '../type/search-request.type';
import { ShowList } from '../models/show-list.model';
import { Show } from '../models/show.model';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getPopularMoviesBySearch(request: SearchRequest): Observable<ShowList<Show>> {
    let requestUrl: string;
    if (request.query) {
      requestUrl = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/search/movie`,
          query: request,
        },
        { skipNull: true }
      );
    } else {
      requestUrl = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/movie/popular`,
          query: request,
        },
        { skipNull: true }
      );
    }
    return this.http.get<ShowList<Show>>(requestUrl).pipe(
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
