import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//moduls
import {PageModule} from './pages/pages.module';

//rutas
import { APP_ROUTES } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicioModule } from './servicios/servicio.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
