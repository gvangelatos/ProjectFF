import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../feed/feed.page').then((m) => m.FeedPage),
          },
          {
            path: ':articleId',
            loadComponent: () =>
              import('../article/article.page').then((m) => m.ArticlePage),
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',

            loadComponent: () =>
              import('../search/search.page').then((m) => m.SearchPage),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home/tabs/feed',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tabs/feed',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
