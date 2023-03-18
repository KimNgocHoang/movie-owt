import { MovieService, Query } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  queryValue: Query = {
    query: '',
    page: 1,
  };

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams.search;
    this.searchTextUpdate.pipe(debounceTime(1000)).subscribe((results) => {
      this.search(results);
    });
    this.route.queryParams
      .pipe(
        map((query) => query.search),
        map((query) => this.getMoviesBySearch(query))
      )
      .subscribe((results) => {
        this.movies = results;
      });
  }

  search(term: string): void {
    this.router.navigate([], {
      queryParams: { search: term },
    });
  }

  getMoviesBySearch(text: string) {
    this.queryValue.query = text;
    this.movieService
      .getPopularMoviesBySearch(this.queryValue)
      .subscribe((res) => {
        this.movies = res.results;
      });
    return this.movies;
  }
}
