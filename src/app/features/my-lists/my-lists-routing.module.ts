import { NgModule } from "@angular/core";
import { ListsComponent } from "./pages/lists/lists.component";
import { MyListsComponent } from "./pages/lists/my-lists/my-lists.component";
import { MyListCreateComponent } from "./pages/my-list-create/my-list-create.component";
import { MyListDetailsComponent } from "./pages/my-list-details/my-list-details.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
    children: [
      { path: '', component: MyListsComponent },
      { path: 'create-list', component: MyListCreateComponent },
      { path: ':id', component: MyListDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyListsRoutingModule {}
