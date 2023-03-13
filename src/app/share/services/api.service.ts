import { Movie } from './../../core/models/movie';
import { environment } from './../../../environments/environment';
import { MovieList } from '../../core/models/movie-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_KEY = environment.apiKey;
  private URL_GET_MOVIES_POPULAR = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http: HttpClient) {}

  toCamel(s: string) {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  keysToCamel(o: any) {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      Object.keys(o).forEach((k) => {
        n[this.toCamel(k)] = this.keysToCamel(o[k]);
      });
      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }

  getMoviesPopular(): Observable<MovieList> {
    return this.http
      .get<MovieList>(`${this.URL_GET_MOVIES_POPULAR}?page=1`)
      .pipe(
        map((responseData) => {
          return { ...this.keysToCamel(responseData) };
        })
      );
  }
}
