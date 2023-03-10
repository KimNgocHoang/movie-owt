import { environment } from './../../../environments/environment';
import { MovieListModel } from '../../core/models/movie-list.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_KEY = environment.API;
  private URL_GET_MOVIES_POPULAR = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http: HttpClient) {}

  getMoviesPopular(): Observable<MovieListModel> {
    return this.http.get<MovieListModel>(
      `${this.URL_GET_MOVIES_POPULAR}?api_key=${this.API_KEY}&language=en-US&page=1`
    );
  }
}
