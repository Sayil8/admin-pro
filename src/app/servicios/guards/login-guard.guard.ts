import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router){

  }

  canActivate(){

    if (this.usuarioService.estaLogeado()){
      console.log('paso por el guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
