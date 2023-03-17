import { MovieList } from './../../../../core/models/movie-list.model';
import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  public paramGroup: QueryParamGroup;

  constructor(
    private movieService: MovieService,
    private qpb: QueryParamBuilder
  ) {
    this.paramGroup = this.qpb.group({
      searchText: this.qpb.stringParam('search', {
        debounceTime: 2500,
      }),
    });
  }

  ngOnInit() {
    this.paramGroup.valueChanges
      .pipe(
        map((value) =>
          value.searchText !== null
            ? this.getMoviesBySearch(value.searchText)
            : this.getMovies()
        )
      )
      .subscribe((v) => (this.movies = v));
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe((res) => {
      this.movies = res.results;
    });
    return this.movies;
  }

  getMoviesBySearch(text: string) {
    this.movieService.getPopularMovies().subscribe((res) => {
      this.movies = res.results.filter((i) =>
        i.originalTitle.toLowerCase().includes(text.toLowerCase())
      );
    });
    return this.movies;
  }
}
