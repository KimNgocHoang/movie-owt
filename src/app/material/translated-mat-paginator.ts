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
    const newPage = (length === 0 || pageSize === 0) ? 0 : page + 1;
    return this.translateService.instant('material.matPaginator.labels.page', {
      page: newPage,
      totalPage: length,
    });
  };
  getAndInitTranslations() {
    this.itemsPerPageLabel = this.translateService.instant(
      'material.matPaginator.labels.itemsPerPage'
    );
    this.previousPageLabel = this.translateService.instant(
      'material.matPaginator.labels.lastPage'
    );
    this.nextPageLabel = this.translateService.instant(
      'material.matPaginator.labels.nextPage'
    );
  }
}
