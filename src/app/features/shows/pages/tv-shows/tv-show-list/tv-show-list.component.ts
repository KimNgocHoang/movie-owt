import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SearchRequest } from '../../../type/search-request.type';
import { PageEvent } from '@angular/material/paginator';
import { TvShow } from '../../../models/tv-show.model';
import { TvShowService } from '../../../tv-shows.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['../../movies/movie-list/movie-list.component.scss'],
})
export class TvShowListComponent implements OnInit, OnDestroy {
  tvShows: TvShow[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  getTvShowsByApiSub: Subscription;
  totalPages: number;
  totalResults: number;
  pageIndex: number;
  constructor(
    private tvShowService: TvShowService,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams.search;
    this.searchTextUpdate.pipe(debounceTime(1000)).subscribe((results) => {
      this.search(results);
    });
    this.getTvShowsByApiSub = this.route.queryParamMap.subscribe((results) => {
      this.getTvShowsBySearch({
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

  getTvShowsBySearch(searchTvShowsRes: SearchRequest) {
    this.loading = true;
    this.tvShowService
      .getPopularTvShowsBySearch(searchTvShowsRes)
      .subscribe((res) => {
        this.tvShows = res.results;
        this.totalPages = res.totalPages;
        this.totalResults = res.totalResults;
        this.loading = false;
      });
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
    this.getTvShowsByApiSub.unsubscribe();
  }
}
