import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class TranslatedMatPaginator
  extends MatPaginatorIntl
  implements OnDestroy
{
  private unsubscribe: Subject<void> = new Subject<void>();

  rangeLabel = 'of';

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translateService
      .get([
        'shows.movieList.labels.itemsPerPage',
        'shows.movieList.labels.lastPage',
        'shows.movieList.labels.nextPage',
        'shows.movieList.labels.range',
      ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((translation) => {
        this.itemsPerPageLabel =
          translation['shows.movieList.labels.itemsPerPage'];
        this.previousPageLabel = translation['shows.movieList.labels.lastPage'];
        this.nextPageLabel = translation['shows.movieList.labels.nextPage'];
        this.rangeLabel = translation['shows.movieList.labels.range'];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.rangeLabel} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.rangeLabel} ${length}`;
  };
}
