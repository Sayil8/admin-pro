import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../servicios/servicio.index';
import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
  {path: '',
  component: PagesComponent,
  canActivate: [LoginGuardGuard],
  children: [
    {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
    {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de tema'}},
    {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
    {path: '', component: DashboardComponent}


  ] }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
