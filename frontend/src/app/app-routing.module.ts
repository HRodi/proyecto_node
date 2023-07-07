import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-edit/:id',
    loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'theme-list',
    loadChildren: () => import('./theme-list/theme-list.module').then( m => m.ThemeListPageModule)
  },
  {
    path: 'theme-edit/:id',
    loadChildren: () => import('./theme-edit/theme-edit.module').then( m => m.ThemeEditPageModule)
  },
  {
    path: 'theme-edit',
    loadChildren: () => import('./theme-edit/theme-edit.module').then( m => m.ThemeEditPageModule)
  },
  {
    path: 'theme-properties/:property_id',
    loadChildren: () => import('./theme-properties/theme-properties.module').then( m => m.ThemePropertiesPageModule)
  },
  {
    path: 'theme-properties-list/:theme_id',
    loadChildren: () => import('./theme-properties-list/theme-properties-list.module').then( m => m.ThemePropertiesListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
