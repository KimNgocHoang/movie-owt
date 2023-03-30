import { Show } from 'src/app/core/models/show.model';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss'],
})
export class ShowListItemComponent {
  @Input() show: Show;

  constructor(public router: Router) {}
}
