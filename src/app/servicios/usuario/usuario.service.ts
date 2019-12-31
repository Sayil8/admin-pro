import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';

import _swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: String;

  constructor(public http: HttpClient,
              public router: Router) {
    this.cargarStorage();
  }


  estaLogeado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  loginGoogle(token: string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url , {token} )
        .map( (resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
        });
  }

  login(usuario: Usuario, recordar: boolean){

    let url = URL_SERVICIOS + '/login';

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario)
            .map( (resp: any) => {
              this.guardarStorage(resp.id, resp.token, resp.usuario);
              return true;
            });
  }


  crearUsuario(usuario: Usuario  ){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
          .map( (resp: any) => {
              _swal('Usuario creado', usuario.email, 'success');
              return resp.usuario;
          });
  }
}
