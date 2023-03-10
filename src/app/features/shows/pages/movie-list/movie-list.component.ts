import { MovieListModel } from '../../../../core/models/movie-list.model';
import { ApiService } from './../../../../share/services/api.service';
import { MovieModel } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  list: Observable<MovieListModel>;
  movies: MovieModel[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.list = this.apiService.getMoviesPopular();
    this.list.subscribe((res) => {
      this.movies = res.results;
      console.log(this.movies);
    });
  }
}
