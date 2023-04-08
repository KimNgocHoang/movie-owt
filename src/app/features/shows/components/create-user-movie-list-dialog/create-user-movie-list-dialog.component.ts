import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListsService } from '../../services/user-lists.service';
import { ToastComponent } from '../toast/toast.component';
import { messageStatus } from '../../enum/message-status.enum';
import { UserMovieList } from '../../models/user-movie-list.model';

@Component({
  selector: 'app-create-user-movie-list-dialog',
  templateUrl: './create-user-movie-list-dialog.component.html',
  styleUrls: ['./create-user-movie-list-dialog.component.scss'],
})
export class CreateUserMovieListDialogComponent implements OnInit {
  formCreate: FormGroup;
  message: string;
  constructor(
    private userListsService: UserListsService,
    public translate: TranslateService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateUserMovieListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserMovieList
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
          this.message = messageStatus.SUCCESS;
          this.userListsService
            .getUserListDetails(response.list_id)
            .subscribe((response) => {
              const newList: UserMovieList = response;
              this.dialogRef.close(newList);
            });
        } else {
          this.message = messageStatus.ERROR;
        }
        this._snackBar.openFromComponent(ToastComponent, {
          duration: 2000,
          data: this.message,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
    }
  }
}
