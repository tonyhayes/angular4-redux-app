import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  {
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
