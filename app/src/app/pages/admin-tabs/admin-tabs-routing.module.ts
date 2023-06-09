import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTabsPage } from './admin-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then( m => m.ReportesPageModule)
      },
      {
        path: 'signup-admin',
        loadChildren: () => import('../signup-admin/signup-admin.module').then( m => m.SignupAdminPageModule)
      },
      {
        path: 'perfil-admin',
        loadChildren: () => import('../perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/perfil-admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsPageRoutingModule {}
