import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./home/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./home/product-list/product-list.page').then(m => m.ProductListPage)
  },
  {
    path: 'product-form',
    loadComponent: () => import('./home/product-form/product-form.page').then(m => m.ProductFormPage)
  },
  {
    path: 'product-form/:id',
    loadComponent: () => import('./home/product-form/product-form.page').then(m => m.ProductFormPage)
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
