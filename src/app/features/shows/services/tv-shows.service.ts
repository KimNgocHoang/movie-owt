import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { SearchRequest } from '../types/search-request.type';
import { ShowList } from '../models/show-list.model';
import { Show } from '../models/show.model';
import { environment } from 'src/environments/environment';
import { TvShow } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  constructor(private http: HttpClient) {}

  getPopularTvShowsBySearch(
    request: SearchRequest
  ): Observable<ShowList<Show>> {
    let requestUrl: string;
    if (request.query) {
      requestUrl = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/search/tv`,
          query: request,
        },
        { skipNull: true }
      );
    } else {
      requestUrl = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/tv/popular`,
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
  getTvShowById(id: number): Observable<TvShow> {
    return this.http.get<TvShow>(`${environment.apiHost}/tv/${id}`).pipe(
      map((responseData) => {
        return camelcaseKeys(responseData, { deep: true });
      })
    );
  }
}
