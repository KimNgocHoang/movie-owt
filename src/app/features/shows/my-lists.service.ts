import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import camelcaseKeys from 'camelcase-keys';
import { ShowList } from './models/show-list.model';
import { MyLists } from './models/my-lists.model';

@Injectable({
  providedIn: 'root',
})
export class MyListsService {
  constructor(private http: HttpClient) {}

  getMyLists(): Observable<ShowList<MyLists>> {
    return this.http
      .get<ShowList<MyLists>>(`${environment.apiHost}/account/hkncjoc/lists`)
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
}
