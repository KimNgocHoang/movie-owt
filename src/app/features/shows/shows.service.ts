import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import queryString from 'query-string';
import { map, Observable } from 'rxjs';
import { SearchRequest } from './type/search-request.type';
import camelcaseKeys from 'camelcase-keys';
import { TrendingList } from 'src/app/core/models/trending-list.model';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  constructor(private http: HttpClient) {}

  getTrending(request: SearchRequest, type: string): Observable<TrendingList> {
    const urlMain = queryString.stringifyUrl(
      {
        url: `${environment.apiHost}/trending/all/${type}`,
        query: request,
      },
      { skipNull: true }
    );
    return this.http.get<TrendingList>(urlMain).pipe(
      map((responseData) => {
        return camelcaseKeys(responseData, { deep: true });
      })
    );
  }
}
