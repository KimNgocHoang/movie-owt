import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SearchRequest } from '../../../type/search-request.type';
import { Show } from '../../../models/show.model';
import { TvShowService } from '../../../services/tv-shows.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss'],
})
export class TvShowListComponent implements OnInit, OnDestroy {
  tvShows: Show[];
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  getTvShowsByApiSub: Subscription;
  totalPages: number;
  totalResults: number;
  pageIndex: number;
  constructor(
    private tvShowService: TvShowService,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getTvShowsByApiSub = this.route.queryParamMap.subscribe((results) => {
      this.getTvShowsBySearch({
        query: results.get('search'),
        page: +results.get('page') === 0 ? 1 : +results.get('page'),
      });
      this.pageIndex = +results.get('page') - 1;
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

  ngOnDestroy(): void {
    this.getTvShowsByApiSub.unsubscribe();
  }
}
