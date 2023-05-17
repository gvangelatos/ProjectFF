import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home-routing.module').then((m) => m.routes),
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
    // canActivate: [AuthGuard],
  },
  {
    path: 'wardrobe',
    loadComponent: () =>
      import('./pages/wardrobe/wardrobe.page').then((m) => m.WardrobePage),
    // canActivate: [AuthGuard],
  },
];
