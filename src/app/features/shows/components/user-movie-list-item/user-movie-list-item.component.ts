import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-user-movie-list-item',
  templateUrl: './user-movie-list-item.component.html',
  styleUrls: ['./user-movie-list-item.component.scss'],
})
export class UserMovieListItemComponent {
  @Input() movies: Movie;
  @Input() listId: number;
  constructor(public translate: TranslateService) {}
}
