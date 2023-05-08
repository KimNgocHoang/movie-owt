import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UserListsService } from '../../services/user-lists.service';
import { ToastComponent } from '../toast/toast.component';
import { UserMovieListItem } from '../../models/user-movie-list-item.model';

@Component({
  selector: 'app-create-user-movie-list-dialog',
  templateUrl: './create-user-movie-list-dialog.component.html',
  styleUrls: ['./create-user-movie-list-dialog.component.scss'],
})
export class CreateUserMovieListDialogComponent implements OnInit {
  formCreate: FormGroup;
  message: string;
  @Output() addListSuccess = new EventEmitter<UserMovieListItem>();
  constructor(
    private userListsService: UserListsService,
    public translate: TranslateService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateUserMovieListDialogComponent>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formCreate = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onSubmit(form: FormGroup) {
    const data = { ...form.value };
    if (this.formCreate.valid) {
      this.userListsService.createList(data).subscribe((response) => {
        if (response.success) {
          this.userListsService
            .getUserListDetails({ listId: response.list_id })
            .subscribe((response) => {
              const newList: UserMovieListItem = response;
              this.addListSuccess.emit(newList);
            });
          this.initForm();
        }
        this._snackBar.openFromComponent(ToastComponent, {
          duration: 2000,
          data: response.status_code,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
    }
  }
}
