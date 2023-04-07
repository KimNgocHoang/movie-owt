import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserListsService } from '../../user-lists.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-movie-list-dialog',
  templateUrl: './create-user-movie-list-dialog.component.html',
  styleUrls: ['./create-user-movie-list-dialog.component.scss'],
})
export class CreateUserMovieListDialogComponent implements OnInit {
  formCreate: FormGroup;
  statusMessage: string;
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
          this.statusMessage = 'Them thanh cong';
        } else {
          this.statusMessage = 'Them that bai';
        }
        this._snackBar.open(this.statusMessage, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
    }
  }
}
