import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import queryString from 'query-string';
import { map, Observable } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';
import { SearchRequest } from './type/search-request.type';
import { ShowList } from 'src/app/core/models/show-list.model';
import { Show } from 'src/app/core/models/show.model';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  constructor(private http: HttpClient) {}

  getTrending(
    request: SearchRequest,
    type: string
  ): Observable<ShowList<Show>> {
    const urlMain = queryString.stringifyUrl(
      {
        url: `${environment.apiHost}/trending/all/${type}`,
        query: request,
      },
      { skipNull: true }
    );
    return this.http.get<ShowList<Show>>(urlMain).pipe(
      map((responseData) => {
        return camelcaseKeys(responseData, { deep: true });
      })
    );
  }
}
