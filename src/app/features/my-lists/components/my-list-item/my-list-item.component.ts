import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Show } from 'src/app/features/shows/models/show.model';
import { MyListsService } from '../../services/my-lists.service';
import { ParamsRequest } from '../../type/params-request.type';

@Component({
  selector: 'app-my-list-item',
  templateUrl: './my-list-item.component.html',
  styleUrls: ['./my-list-item.component.scss'],
})
export class MyListItemComponent implements OnInit {
  @Input() movies: Show;
  @Input() listId: number;
  @Output() modalOpen = new EventEmitter<boolean>();
  isSuggest = false;
  constructor(private myListService: MyListsService) {}

  ngOnInit(): void {
    this.checkItem({mediaId: this.movies.id, listId: this.listId});
  }

  addItem(paramsRequest: ParamsRequest) {
    this.myListService.addMovieToList(paramsRequest).subscribe((response) => {
      if (response.status_code === 12) {
        this.isSuggest = true;
        this.modalOpen.emit(true);
      } else {
        this.isSuggest = false;
      }
    });
  }

  checkItem(paramsRequest: ParamsRequest) {
    this.myListService.checkItemStatus(paramsRequest).subscribe((response) => {
      response.item_present
        ? (this.isSuggest = true)
        : (this.isSuggest = false);
    });
  }
}
