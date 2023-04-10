import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserListsService } from '../../services/user-lists.service';
import { Show } from '../../models/show.model';
import { ParamsRequest } from '../../types/params-request.type';

@Component({
  selector: 'app-user-movie-list-item',
  templateUrl: './user-movie-list-item.component.html',
  styleUrls: ['./user-movie-list-item.component.scss'],
})
export class UserMovieListItemComponent implements OnInit {
  @Input() movies: Show;
  @Input() listId: number;
  @Output() modalOpen = new EventEmitter<boolean>();
  isSuggest = false;
  constructor(
    private userListsService: UserListsService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkItem({ mediaId: this.movies.id, listId: this.listId });
  }

  addItem(paramsRequest: ParamsRequest) {
    this.userListsService.addMovieToList(paramsRequest).subscribe((response) => {
      if (response.status_code === 12) {
        this.isSuggest = true;
        this.modalOpen.emit(true);
      } else {
        this.isSuggest = false;
      }
    });
  }

  checkItem(paramsRequest: ParamsRequest) {
    this.userListsService.checkItemStatus(paramsRequest).subscribe((response) => {
      response.item_present
        ? (this.isSuggest = true)
        : (this.isSuggest = false);
    });
  }
}
