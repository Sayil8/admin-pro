import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servicios/servicio.index';
import _swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagentemp: string;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario){
      this.usuario.nombre = usuario.nombre;

      if(!this.usuario.google){
         this.usuario.email = usuario.email;
      }


      this.usuarioService.actualizarUsuario(this.usuario)
          .subscribe(resp =>{
          });
  }

  seleccionImagen(archivo: File){


    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      console.log();
      _swal('solo Imagenes', 'El archivo seleccionado no es una img', 'error');
      this.imagenSubir = null;
      return ;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
        this.imagentemp = reader.result as string;
    };
  }

  cambiarImagen(){
     this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
