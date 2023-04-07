import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserListService } from '../../user-lists.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-list-create',
  templateUrl: './my-list-create.component.html',
  styleUrls: ['./my-list-create.component.scss'],
})
export class UserMovieListCreateComponent implements OnInit {
  formCreate: FormGroup;
  statusMessage: string;
  constructor(
    private userListService: UserListService,
    public translate: TranslateService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserMovieListCreateComponent>,
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
      this.userListService.createList(data).subscribe((response) => {
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
