import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailPage } from './card-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CardDetailPage
  },
  {
    path: 'addtask',
    loadChildren: () => import('./add-task/addtask/addtask.module').then( m => m.AddtaskPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardDetailPageRoutingModule {}
