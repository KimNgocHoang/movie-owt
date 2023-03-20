import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
const routes: Routes = [
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  {
    path: 'shows',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('../../features/shows/shows.module').then((m) => m.ShowsModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
