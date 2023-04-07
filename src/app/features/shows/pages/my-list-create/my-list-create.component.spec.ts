import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListCreateComponent } from './my-list-create.component';

describe('MyListCreateComponent', () => {
  let component: MyListCreateComponent;
  let fixture: ComponentFixture<MyListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
