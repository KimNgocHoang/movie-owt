import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SearchRequest } from '../../../type/search-request.type';
import { Show } from '../../../models/show.model';
import { MovieService } from '../../../services/movie.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Show[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  getMoviesByApiSub: Subscription;
  totalPages: number;
  totalResults: number;
  pageIndex: number;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getMoviesByApiSub = this.route.queryParamMap.subscribe((results) => {
      this.getMoviesBySearch({
        query: results.get('search'),
        page: +results.get('page') === 0 ? 1 : +results.get('page'),
      });
      this.pageIndex = +results.get('page') - 1;
    });
  }

  getMoviesBySearch(searchMoviesRes: SearchRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.totalPages = res.totalPages;
        this.totalResults = res.totalResults;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.getMoviesByApiSub.unsubscribe();
  }
}
