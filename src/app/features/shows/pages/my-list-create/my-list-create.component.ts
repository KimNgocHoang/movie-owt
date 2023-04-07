import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MyListsService } from '../../my-lists.service';

@Component({
  selector: 'app-my-list-create',
  templateUrl: './my-list-create.component.html',
  styleUrls: ['./my-list-create.component.scss'],
})
export class MyListCreateComponent implements OnInit {
  formCreate: FormGroup;
  constructor(
    private location: Location,
    private myListService: MyListsService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  onBackList() {
    this.location.back();
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
      this.myListService.createList(data).subscribe((response) => {
        response.success ? this.onBackList() : console.log('loi');
      });
    }
  }
}
