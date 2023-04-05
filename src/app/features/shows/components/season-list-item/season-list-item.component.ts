import { Component, Input } from '@angular/core';
import { Season } from '../../models/tv-show.model';

@Component({
  selector: 'app-season-list-item',
  templateUrl: './season-list-item.component.html',
  styleUrls: ['./season-list-item.component.scss'],
})
export class SeasonListItemComponent {
  @Input() season: Season;
}
