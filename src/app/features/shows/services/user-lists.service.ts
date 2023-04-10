import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from '../models/show-list.model';
import { UserMovieList } from '../models/user-movie-list.model';
import { CreateUserListRequest } from '../types/create-user-list-request.type';
import { ParamsRequest } from '../types/params-request.type';
import { UserMovieListItem } from '../models/user-movie-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class UserListsService {
  constructor(private http: HttpClient) {}

  getUserLists(): Observable<ShowList<UserMovieList>> {
    return this.http
      .get<ShowList<UserMovieList>>(
        `${environment.apiHost}/account/hkncjoc/lists`
      )
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  createList(
    createUserListRequest: CreateUserListRequest
  ): Observable<{ success: number; list_id: number }> {
    return this.http.post<{ success: number; list_id: number }>(
      `${environment.apiHost}/list`,
      createUserListRequest
    );
  }

  getUserListDetails(
    paramsRequest: ParamsRequest
  ): Observable<UserMovieListItem> {
    return this.http
      .get<UserMovieListItem>(`${environment.apiHost}/list/${paramsRequest.listId}`)
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  addMovieToList(
    paramsRequest: ParamsRequest
  ): Observable<{ status_code: number }> {
    const body = { media_id: paramsRequest.mediaId };
    return this.http.post<{ status_code: number; status_message: string }>(
      `${environment.apiHost}/list/${paramsRequest.listId}/add_item`,
      body
    );
  }

  checkItemStatus(
    paramsRequest: ParamsRequest
  ): Observable<{ item_present: boolean }> {
    return this.http.get<{ id: string; item_present: boolean }>(
      `${environment.apiHost}/list/${paramsRequest.listId}/item_status?movie_id=${paramsRequest.mediaId}`
    );
  }
}
