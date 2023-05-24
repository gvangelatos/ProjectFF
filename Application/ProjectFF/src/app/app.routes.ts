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
  {
    path: 'wardrobe/outfits/new',
    loadComponent: () =>
      import('./pages/wardrobe/wardrobe.page').then((m) => m.WardrobePage),
    // canActivate: [AuthGuard],
  },
  {
    path: 'wardrobe/clothing-items/new',
    loadComponent: () =>
      import('./pages/create-clothing-item/create-clothing-item.page').then(
        (m) => m.CreateClothingItemPage
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'wardrobe/outfits/edit/:outfitId',
    loadComponent: () =>
      import('./pages/wardrobe/wardrobe.page').then((m) => m.WardrobePage),
    // canActivate: [AuthGuard],
  },
  {
    path: 'wardrobe/clothing-items/edit/:clothingItemId',
    loadComponent: () =>
      import('./pages/wardrobe/wardrobe.page').then((m) => m.WardrobePage),
    // canActivate: [AuthGuard],
  },
  {
    path: 'create-clothing-item',
    loadComponent: () =>
      import('./pages/create-clothing-item/create-clothing-item.page').then(
        (m) => m.CreateClothingItemPage
      ),
  },
  {
    path: 'edit-clothing-item',
    loadComponent: () => import('./pages/edit-clothing-item/edit-clothing-item.page').then( m => m.EditClothingItemPage)
  },
  {
    path: 'create-outfit',
    loadComponent: () => import('./pages/create-outfit/create-outfit.page').then( m => m.CreateOutfitPage)
  },
  {
    path: 'edit-outfit',
    loadComponent: () => import('./pages/edit-outfit/edit-outfit.page').then( m => m.EditOutfitPage)
  },
];
