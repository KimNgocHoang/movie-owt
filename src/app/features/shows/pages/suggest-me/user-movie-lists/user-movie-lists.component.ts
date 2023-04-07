import { Component, OnInit } from '@angular/core';
import { UserMovieList } from '../../../models/user-movie-list.model';
import { UserListsService } from '../../../user-lists.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserMovieListDialogComponent } from '../../../components/create-user-movie-list-dialog/create-user-movie-list-dialog.component';

@Component({
  selector: 'app-user-movie-lists',
  templateUrl: './user-movie-lists.component.html',
  styleUrls: ['./user-movie-lists.component.scss'],
})
export class UserMovieListsComponent implements OnInit {
  lists: UserMovieList[];
  loading = true;
  constructor(
    private userListsService: UserListsService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.loading = true;
    this.userListsService.getUserLists().subscribe((res) => {
      this.lists = res.results;
      this.loading = false;
    });
  }

  onCreateList() {
    this.dialog.open(CreateUserMovieListDialogComponent);
  }
}
