import { Component, Input } from '@angular/core';
import { MyLists } from '../../models/my-lists.model';

@Component({
  selector: 'app-my-lists-item',
  templateUrl: './my-lists-item.component.html',
  styleUrls: ['./my-lists-item.component.scss'],
})
export class MyListsItemComponent {
  @Input() myLists: MyLists;
}
