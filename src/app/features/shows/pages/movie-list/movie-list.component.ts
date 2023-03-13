import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  count: number;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe((res) => {
      this.movies = res.results;
      console.log(this.movies);
      this.count = Object.keys(this.movies).length;
    });
  }
}
