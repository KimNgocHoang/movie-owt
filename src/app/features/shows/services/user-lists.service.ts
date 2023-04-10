import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from '../models/show-list.model';
import { UserMovieList } from '../models/user-movie-list.model';
import { CreateUserListRequest } from '../types/create-user-list-request.type';

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
  ): Observable<{ success: number, list_id: number}> {
    return this.http.post<{ success: number; list_id: number }>(
      `${environment.apiHost}/list`,
      createUserListRequest
    );
  }

  getUserListDetails(id: number): Observable<UserMovieList> {
    return this.http
      .get<UserMovieList>(`${environment.apiHost}/list/${id}`)
      .pipe(
        map((responseData) => {
          return camelcaseKeys(responseData, { deep: true });
        })
      );
  }
}
