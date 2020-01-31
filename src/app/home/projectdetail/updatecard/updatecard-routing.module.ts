import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatecardPage } from './updatecard.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatecardPageRoutingModule {}
