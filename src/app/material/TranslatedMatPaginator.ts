import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslatedMatPaginator extends MatPaginatorIntl {
  rangeLabel = 'of';
  constructor(private translateService: TranslateService) {
    super();
    this.getAndInitTranslations();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    this.getAndInitTranslations();
    if (length === 0 || pageSize === 0) {
      return `${this.translateService.instant(
        'shows.movieList.labels.page'
      )} 0 ${this.rangeLabel} ${length}`;
    }
    return `${this.translateService.instant('shows.movieList.labels.page')} ${
      page + 1
    } ${this.rangeLabel} ${length}`;
  };

  getAndInitTranslations() {
    this.itemsPerPageLabel = this.translateService.instant(
      'shows.movieList.labels.itemsPerPage'
    );
    this.previousPageLabel = this.translateService.instant(
      'shows.movieList.labels.lastPage'
    );
    this.nextPageLabel = this.translateService.instant(
      'shows.movieList.labels.nextPage'
    );
  }
}
