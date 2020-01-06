import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../servicios/servicio.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [

    {
      path: 'dashboard',
       component: DashboardComponent,
       canActivate: [VerificaTokenGuard],
       data: {titulo: 'Dashboard'}
    },
    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
    {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de tema'}},
    {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
    {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
    //mantenimiento
    {path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AdminGuard],
    data: {titulo: 'Mantenimieto de usuarios'}
  },
    {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
    {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos'}},
    {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'}},
    {path: '', component: DashboardComponent}


];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
