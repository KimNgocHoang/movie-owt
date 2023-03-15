import { Movie } from './../../../../core/models/movie';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies-list-item',
  templateUrl: './movies-list-item.component.html',
  styleUrls: ['./movies-list-item.component.scss'],
})
export class MoviesListItemComponent {
  @Input() movie: Movie;
}
