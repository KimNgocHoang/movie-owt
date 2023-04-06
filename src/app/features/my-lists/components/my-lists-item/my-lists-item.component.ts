import { Component, Input } from '@angular/core';
import { MyList } from '../../models/my-list.model';

@Component({
  selector: 'app-my-lists-item',
  templateUrl: './my-lists-item.component.html',
  styleUrls: ['./my-lists-item.component.scss'],
})
export class MyListsItemComponent {
  @Input() myList: MyList;
}
