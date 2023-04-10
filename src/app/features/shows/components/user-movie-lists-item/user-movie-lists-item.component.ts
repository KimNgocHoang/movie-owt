import { Component, Input } from '@angular/core';
import { UserMovieList } from '../../models/user-movie-list.model';

@Component({
  selector: 'app-user-movie-lists-item',
  templateUrl: './user-movie-lists-item.component.html',
  styleUrls: ['./user-movie-lists-item.component.scss'],
})
export class UserMovieListsItemComponent {
  @Input() userMovieList: UserMovieList;
}
