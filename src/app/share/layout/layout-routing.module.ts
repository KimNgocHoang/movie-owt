import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'shows', pathMatch: 'full' },
  {
    path: 'shows',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('../../features/shows/shows.module').then((m) => m.ShowsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
