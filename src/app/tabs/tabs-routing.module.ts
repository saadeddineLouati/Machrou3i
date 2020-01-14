import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', children: [{path: '', loadChildren: () =>import('../home/home.module').then(m => m.HomePageModule)}]
      },
      {
        path: 'tab2', children: [{path: '', loadChildren: () =>import('../notifications/notifications.module').then(m => m.NotificationsPageModule)}]
      },
      {
        path: 'tab3', children: [{path: '', loadChildren: () =>import('../research/research.module').then(m => m.ResearchPageModule)}]
      },
      {
        path: 'tab4', loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)},
      {
        path: 'tab5',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '', redirectTo: '/tabs/tab1', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: '/tabs/tab1', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
