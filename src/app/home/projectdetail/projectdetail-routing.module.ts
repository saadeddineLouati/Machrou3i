import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectdetailPage } from './projectdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectdetailPage
  },
  {
    path: 'add-card',
    loadChildren: () => import('./add-card/add-card.module').then( m => m.AddCardPageModule)
  },
  {
    path: 'card-detail',
    loadChildren: () => import('./card-detail/card-detail.module').then( m => m.CardDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectdetailPageRoutingModule {}
