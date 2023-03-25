import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslatedMatPaginator extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    this.getAndInitTranslations();
    length === 0 || pageSize === 0 ? (page = 0) : (page = page + 1);
    return this.translateService.instant('shows.movieList.labels.page', {
      page: page,
      totalPage: length,
    });
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
