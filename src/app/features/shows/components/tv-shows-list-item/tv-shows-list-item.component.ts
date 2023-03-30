import { TvShow } from './../../../../core/models/tv.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tv-shows-list-item',
  templateUrl: './tv-shows-list-item.component.html',
  styleUrls: ['./tv-shows-list-item.component.scss'],
})
export class TvShowsListItemComponent {
  @Input() tvShow: TvShow;
}
