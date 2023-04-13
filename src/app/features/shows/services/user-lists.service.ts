import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from '../models/show-list.model';
import { UserMovieList } from '../models/user-movie-list.model';
import { CreateUserListRequest } from '../types/create-user-list-request.type';
import { CreateMovieRequest } from '../types/create-movie-request.type';
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
    listIdRequest: CreateMovieRequest
  ): Observable<UserMovieListItem> {
    return this.http
      .get<UserMovieListItem>(
        `${environment.apiHost}/list/${listIdRequest.listId}`
      )
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }

  addMovieToList(
    createMovieRequest: CreateMovieRequest
  ): Observable<{ success: boolean }> {
    const body = { media_id: createMovieRequest.mediaId };
    return this.http.post<{ success: boolean }>(
      `${environment.apiHost}/list/${createMovieRequest.listId}/add_item`,
      body
    );
  }

  checkItemStatus(
    MovieRequest: CreateMovieRequest
  ): Observable<{ item_present: boolean }> {
    return this.http.get<{ id: string; item_present: boolean }>(
      `${environment.apiHost}/list/${MovieRequest.listId}/item_status?movie_id=${MovieRequest.mediaId}`
    );
  }
}
