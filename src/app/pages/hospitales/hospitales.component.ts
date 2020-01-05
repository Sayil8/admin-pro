import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/servicios/servicio.index';
import { ModalUploadService } from 'src/app/componentes/modal-upload/modal-upload.service';

import _swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];
  hospital: Hospital;

  constructor( public hospitalService: HospitalService,
               public modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    this.modalUploadService.notificacion
    .subscribe(resp => {
      this.cargarHospitales();
    });
  }

  crearHospital(nombre: string){

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {

      if(!valor || valor.length === 0){
        return ;
      }

      this.hospitalService.crearHospital(valor)
            .subscribe( () => {
              this.cargarHospitales();
            });

    });
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalService.cargarHospitales()
            .subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.hospitales = resp.hospitales;
              this.cargando = false;
            });

  }
  agregarHospital(nombre: string){


    this.hospitalService.crearHospital(nombre)
            .subscribe();
  }

  mostrarModal(hospital: Hospital){
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  buscarHospital( input: string){

    if(input.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital(input)
          .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;
            this.cargando = false;
          });
  }

  actualizarHospital(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital)
          .subscribe( );

  }
  borrarHospital(hospital: Hospital){
    swal({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar un hospital',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

      if(borrar){
        this.hospitalService.borrarHospital(hospital._id)
                .subscribe(resp => {
                    this.cargarHospitales();

                });
      }
    });
  }
}
