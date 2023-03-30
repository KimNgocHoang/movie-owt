import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from '../../models/show.model';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss'],
})
export class ShowListItemComponent {
  @Input() show: Show;

  constructor(public router: Router) {}
}
