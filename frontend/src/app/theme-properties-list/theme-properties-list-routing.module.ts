import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemePropertiesListPage } from './theme-properties-list.page';

const routes: Routes = [
  {
    path: '',
    component: ThemePropertiesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemePropertiesListPageRoutingModule {}
