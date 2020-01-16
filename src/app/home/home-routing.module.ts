import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'addproject',
    loadChildren: () => import('./addproject/addproject.module').then( m => m.AddprojectPageModule)
  },
  {
    path: 'projectdetail',
    loadChildren: () => import('./projectdetail/projectdetail.module').then( m => m.ProjectdetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
