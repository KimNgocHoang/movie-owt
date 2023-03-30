import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { SearchRequest } from './type/search-request.type';
import { TvShowList } from 'src/app/core/models/tv-list.model.';
import { TvShow } from 'src/app/core/models/tv.model';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  constructor(private http: HttpClient) {}

  getPopularTvShowsBySearch(request: SearchRequest): Observable<TvShowList> {
    let urlMain: string;
    if (request.query) {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/search/tv`,
          query: request,
        },
        { skipNull: true }
      );
    } else {
      urlMain = queryString.stringifyUrl(
        {
          url: `${environment.apiHost}/tv/popular`,
          query: request,
        },
        { skipNull: true }
      );
    }
    return this.http.get<TvShowList>(urlMain).pipe(
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
