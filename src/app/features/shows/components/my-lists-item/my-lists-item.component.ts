import { Component, Input } from '@angular/core';
import { UserMovieList } from '../../models/user-movie-list.model';

@Component({
  selector: 'app-my-lists-item',
  templateUrl: './my-lists-item.component.html',
  styleUrls: ['./my-lists-item.component.scss'],
})
export class UserMovieListsItemComponent {
  @Input() userMovieList: UserMovieList;
}
