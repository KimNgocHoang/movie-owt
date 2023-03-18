import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchMoviesRequest } from '../../type/search-movies-request.type';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  queryValue: SearchMoviesRequest = {
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
    this.route.queryParamMap
      .pipe(
        map(
          (params) =>
            (this.queryValue = {
              page: +params.get('page') !== 0 ? +params.get('page') : 1,
              query: params.get('search'),
            })
        ),
        map((results) => this.getMoviesBySearch(results))
      )
      .subscribe((results) => {
        this.movies = results;
      });
  }

  search(term: string): void {
    this.router.navigate([], {
      queryParams: {
        search: term,
        page: this.queryValue.page,
      },
    });
  }

  getMoviesBySearch(searchMoviesRes: SearchMoviesRequest) {
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
      });
    return this.movies;
  }
}
