import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from './models/show-list.model';
import { UserMovieList } from './models/user-movie-list.model';
import { CreateUserListRequest } from './type/create-user-list-request.type';

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
  ): Observable<{ success: number}> {
    return this.http.post<{ success: number}>(
      `${environment.apiHost}/list`,
      createUserListRequest
    );
  }
}
