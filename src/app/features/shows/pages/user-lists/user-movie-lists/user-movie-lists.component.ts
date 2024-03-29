import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserMovieList } from '../../../models/user-movie-list.model';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserMovieListDialogComponent } from '../../../components/create-user-movie-list-dialog/create-user-movie-list-dialog.component';
import { UserListsService } from '../../../services/user-lists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-movie-lists',
  templateUrl: './user-movie-lists.component.html',
  styleUrls: ['./user-movie-lists.component.scss'],
})
export class UserMovieListsComponent implements OnInit, OnDestroy {
  lists: UserMovieList[];
  loading = true;
  addListSub: Subscription;
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
    const dialogRef = this.dialog.open(CreateUserMovieListDialogComponent);
    this.addListSub = dialogRef.componentInstance.addListSuccess.subscribe(
      (newList: UserMovieList) => {
        if (newList) {
          this.handleAddListSuccess(newList);
        }
      }
    );
  }

  handleAddListSuccess(newList: UserMovieList) {
    this.lists = [newList, ...this.lists];
  }

  ngOnDestroy(): void {
    if (this.addListSub) this.addListSub.unsubscribe();
  }
}
