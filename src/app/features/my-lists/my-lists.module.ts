import { ListsComponent } from './pages/lists/lists.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListsItemComponent } from './components/my-lists-item/my-lists-item.component';
import { MyListsComponent } from './pages/lists/my-lists/my-lists.component';
import { MyListCreateComponent } from './pages/my-list-create/my-list-create.component';
import { MyListDetailsComponent } from './pages/my-list-details/my-list-details.component';
import { MyListItemComponent } from './components/my-list-item/my-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyListsRoutingModule } from './my-lists-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ListsItemSkeletonComponent } from './components/lists-item-skeleton/lists-item-skeleton.component';
import { MovieItemSkeletonComponent } from './components/movie-item-skeleton/movie-item-skeleton.component';

@NgModule({
  declarations: [
    MyListsItemComponent,
    MyListsComponent,
    MyListCreateComponent,
    MyListDetailsComponent,
    MyListItemComponent,
    ListsComponent,
    ListsItemSkeletonComponent,
    MovieItemSkeletonComponent,
  ],
  imports: [
    CommonModule,
    MyListsRoutingModule,
    ShareModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MyListsModule {}
