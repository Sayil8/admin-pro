import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servicios/servicio.index';

import { ModalUploadService } from 'src/app/componentes/modal-upload/modal-upload.service';
import _swal from 'sweetalert';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion
    .subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string){
      this.modalUploadService.mostrarModal('usuarios', id);

  }


  cargarUsuarios(){

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
            });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino)
        .subscribe( (usuarios: Usuario[]) => {

          this.usuarios = usuarios;

          this.cargando = false;
        });
  }

  borrarUsuario(usuario: Usuario){

    if(usuario._id === this.usuarioService.usuario._id){
      _swal('No puede borrar usuario', 'no puede borrar mismo usuario', 'error');
      return;
    }

    swal({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar a:' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

      if(borrar){
        this.usuarioService.borrarUsuario(usuario._id)
                .subscribe(resp => {
                    this.cargarUsuarios();

                });
      }
    });

  }

  guardarUsuario(usuario: Usuario){
      this.usuarioService.actualizarUsuario(usuario)
            .subscribe();
  }
}
