import { MovieList } from '../../../../core/models/movie-list.model';
import { ApiService } from './../../../../share/services/api.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.apiService.getMoviesPopular().subscribe((res) => {
      this.movies = res.results;
      console.log(this.movies);
    });
  }
}
