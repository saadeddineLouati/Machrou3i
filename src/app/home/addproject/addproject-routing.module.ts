import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprojectPage } from './addproject.page';

const routes: Routes = [
  {
    path: '',
    component: AddprojectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprojectPageRoutingModule {}
