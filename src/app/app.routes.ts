import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Caio Chiquetto - Home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  }
]
