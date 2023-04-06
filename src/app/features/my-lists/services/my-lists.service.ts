import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from '../../shows/models/show-list.model';
import { MyList } from '../models/my-list.model';
import { ListItem } from '../models/list-item.model';
import { ParamsRequest } from '../type/params-request.type';

@Injectable({
  providedIn: 'root',
})
export class MyListsService {
  constructor(private http: HttpClient) {}

  getMyLists(): Observable<ShowList<MyList>> {
    return this.http
      .get<ShowList<MyList>>(`${environment.apiHost}/account/hkncjoc/lists`)
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  createList(request: {
    name: string;
    description: string;
  }): Observable<{ success: number; status_message: string }> {
    return this.http.post<{ success: number; status_message: string }>(
      `${environment.apiHost}/list`,
      request
    );
  }

  addMovieToList(
    paramsRequest: ParamsRequest
  ): Observable<{ status_code: number; status_message: string }> {
    const body = { media_id: paramsRequest.mediaId };
    return this.http.post<{ status_code: number; status_message: string }>(
      `${environment.apiHost}/list/${paramsRequest.listId}/add_item`,
      body
    );
  }

  getMyListDetails(paramsRequest: ParamsRequest): Observable<ListItem> {
    return this.http
      .get<ListItem>(`${environment.apiHost}/list/${paramsRequest.listId}`)
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  checkItemStatus(
    paramsRequest: ParamsRequest
  ): Observable<{ id: string; item_present: boolean }> {
    return this.http.get<{ id: string; item_present: boolean }>(
      `${environment.apiHost}/list/${paramsRequest.listId}/item_status?movie_id=${paramsRequest.mediaId}`
    );
  }
}
