import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/servicios/servicio.index';
import _swal from 'sweetalert';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagentemp: string;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  subirImagen(){
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
          .then( resp => {

            this.modalUploadService.notificacion.emit(resp);
           this.cerrarModal();
          })
          .catch(err => {
              console.log('error en la carga');
          });
  }
  cerrarModal(){
    this.imagentemp = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal();
  }

}
