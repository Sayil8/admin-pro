import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from 'src/app/servicios/servicio.index';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/componentes/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [];
  medico: Medico = new Medico( '','','','','');
  hospital: Hospital = new Hospital('');

  constructor(public hospitalService: HospitalService,
              public medicoService: MedicoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public uploadService: ModalUploadService)
              {
                activatedRoute.params.subscribe( params => {


                  let id = params['id'];

                  if(id !== 'nuevo'){
                    this.cargarMedico(id);
                  }
                });
               }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
        .subscribe( (resp: any) => {
            this.hospitales = resp.hospitales;
        } );

    this.uploadService.notificacion
      .subscribe(res => {
        this.medico.img = res.medico.img;
    });
  }

  guardarMedico(f: NgForm) {


    if ( f.invalid ) {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
          .subscribe( medico => {

              this.medico._id = medico._id;
              this.router.navigate(['/medico', medico._id]);
          });
  }

  cambioHospital(id: string){

    this.hospitalService.obtenerHospitales(id)
        .subscribe( hospital => {
          this.hospital = hospital;
        });
  }

  cargarMedico(id: string){
    this.medicoService.cargarMedico(id)
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital(this.medico.hospital);
        })
  }

  cambiarFoto(){
      this.uploadService.mostrarModal('medicos', this.medico._id);
  }

}
