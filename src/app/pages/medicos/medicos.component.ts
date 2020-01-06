import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/servicios/servicio.index';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/componentes/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando: boolean = false;
  medicos: Medico [] = [];

  constructor(public medicoService: MedicoService,
              public uploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedico();
  }

  cargarMedico(){
    this.medicoService.cargarMedicos()
          .subscribe( resp => {
                this.medicos = resp;
          });
  }

  buscarMedico( termino: string){

    if(termino.length <= 0){
      this.cargarMedico();
      return;
    }
    this.medicoService.buscarMedico(termino)
            .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico){
        this.medicoService.borrarMedico(medico._id)
              .subscribe( () => this.cargarMedico() );
  }
  mostrarMedicos(medico: Medico){
    this.uploadService.mostrarModal('medicos', medico._id);
    this.cargarMedico();
  }
}
