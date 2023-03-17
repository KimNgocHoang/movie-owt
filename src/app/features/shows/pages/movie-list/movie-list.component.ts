import { MovieList } from './../../../../core/models/movie-list.model';
import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  searchText: string;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams.search;
    this.route.queryParams
      .pipe(
        map((query) => query.search),
        debounceTime(2000),
        map((query) => this.getMoviesBySearch(query))
      )
      .subscribe((results) => {
        this.movies = results;
      });
  }

  search(term: string): void {
    this.router.navigate([], { queryParams: { search: term } });
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe((res) => {
      this.movies = res.results;
    });
    return this.movies;
  }

  getMoviesBySearch(text: string) {
    this.movieService.getPopularMoviesBySearch(text).subscribe((res) => {
      this.movies = res.results;
    });
    return this.movies;
  }
}
