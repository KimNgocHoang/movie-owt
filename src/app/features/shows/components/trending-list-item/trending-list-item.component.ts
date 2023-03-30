import { Component, Input } from '@angular/core';
import { Trending } from 'src/app/core/models/trending.model';

@Component({
  selector: 'app-trending-list-item',
  templateUrl: './trending-list-item.component.html',
  styleUrls: ['./trending-list-item.component.scss'],
})
export class TrendingListItemComponent {
  @Input() trending: Trending;
}
