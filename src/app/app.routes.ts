import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Caio Chiquetto - Front-end Engineer | Angular & SAP Spartacus',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  }
]
