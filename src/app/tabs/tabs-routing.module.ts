import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'menu',
    component: TabsPage,
    children: [
      {
        path: 'home', children: [{path: '', loadChildren: () =>import('../home/home.module').then(m => m.HomePageModule)}]
      },
      {
        path: 'notifications', children: [{path: '', loadChildren: () =>import('../notifications/notifications.module').then(m => m.NotificationsPageModule)}]
      },
      {
        path: 'research', children: [{path: '', loadChildren: () =>import('../research/research.module').then(m => m.ResearchPageModule)}]
      },
      {
        path: 'conversations', loadChildren: () => import('../conversations/conversations.module').then( m => m.ConversationsPageModule)},
      {
        path: 'profile', loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '', redirectTo: '/menu/home', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: '/menu/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
