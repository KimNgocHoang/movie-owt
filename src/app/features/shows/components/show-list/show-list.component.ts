import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Show } from '../../models/show.model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  @Input() listType: 'movieList' | 'tvShowList';
  @Input() totalPages: number;
  @Input() totalResults: number;
  @Input() pageIndex: number;
  @Input() shows: Show[];
  @Input() loading: boolean;
  @Input() searchText: string;
  @Input() searchTextUpdate = new Subject<string>();

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchText = this.route.snapshot.queryParams.search;
    this.searchTextUpdate.pipe(debounceTime(1000)).subscribe((results) => {
      this.search(results);
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
  search(term: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term },
      queryParamsHandling: 'merge',
    });
  }
}
