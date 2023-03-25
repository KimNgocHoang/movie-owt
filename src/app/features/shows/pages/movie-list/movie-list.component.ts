import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { SearchMoviesRequest } from '../../type/search-movies-request.type';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  getMoviesByApiSub: Subscription;
  totalPages: number;
  pageIndex: number;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams.search;
    this.searchTextUpdate.pipe(debounceTime(1000)).subscribe((results) => {
      this.search(results);
    });
    this.getMoviesByApiSub = this.route.queryParamMap.subscribe((results) => {
      this.movies = this.getMoviesBySearch({
        query: results.get('search'),
        page: +results.get('page') === 0 ? 1 : +results.get('page'),
      });
      this.pageIndex = +results.get('page') - 1;
    });
  }
  search(term: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term },
      queryParamsHandling: 'merge',
    });
  }

  getMoviesBySearch(searchMoviesRes: SearchMoviesRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.totalPages = res.totalPages;
        this.loading = false;
      });
    return this.movies;
  }

  pageChangeEvent(event: PageEvent) {
    this.router.navigate([], {
      queryParams: {
        page: event.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.translate.onLangChange.unsubscribe();
    this.getMoviesByApiSub.unsubscribe();
  }
}
