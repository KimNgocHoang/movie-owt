import { Component, OnInit } from '@angular/core';
import { MyList } from '../../../models/my-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MyListsService } from '../../../services/my-lists.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent implements OnInit {
  myLists: MyList[];
  loading = true;
  constructor(
    private myListService: MyListsService,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.myListService.getMyLists().subscribe((res) => {
      this.myLists = res.results;
      this.loading = false;
    });
  }

  onCreateList() {
    this.router.navigate(['create-list'], {
      relativeTo: this.route,
    });
  }
}
