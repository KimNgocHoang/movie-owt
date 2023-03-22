import { MovieService } from './../../movie.service';
import { Movie } from './../../../../core/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { SearchMoviesRequest } from '../../type/search-movies-request.type';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading: boolean = true;
  getMoviesByApiSub: Subscription;
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
    });
  }

  search(term: string, page: number = 1): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term, page: page },
      queryParamsHandling: 'merge',
    });
  }

  getMoviesBySearch(searchMoviesRes: SearchMoviesRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.loading = false;
      });
    return this.movies;
  }

  ngOnDestroy(): void {
    this.translate.onLangChange.unsubscribe();
    this.getMoviesByApiSub.unsubscribe();
  }
}
