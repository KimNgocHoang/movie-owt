import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserMovieList } from '../../../models/user-movie-list.model';
import { UserListService } from '../../../user-lists.service';
import { MatDialog } from '@angular/material/dialog';
import { UserMovieListCreateComponent } from '../../my-list-create/my-list-create.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class UserMovieListsComponent implements OnInit {
  lists: UserMovieList[];
  loading = true;
  constructor(
    private userListService: UserListService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.userListService.getUserLists().subscribe((res) => {
      this.lists = res.results;
      this.loading = false;
    });
  }

  onCreateList() {
    this.dialog.open(UserMovieListCreateComponent);
  }
}
