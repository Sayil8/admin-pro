import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import _swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public Http: HttpClient,
               public usuarioService: UsuarioService ) { }


  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.Http.get(url)
          .map ( (resp: any) => {

            this.totalMedicos = resp.total;
            return resp.medicos;
          });

  }

  cargarMedico(id: string){
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.Http.get(url)
          .map ( (resp: any) => {
            return resp.medico;
          });
  }

  buscarMedico(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.Http.get(url)
          .map( (resp: any) => resp.medicos );
  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.Http.delete(url)
            .map( resp => {
              _swal('medico borrado', 'el medico ha sido eliminado correctamente' , 'success');
              return true;
            });
  }
  guardarMedico( medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if(medico._id){
      //actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;
      return this.Http.put(url, medico)
          .map( (resp:any) => {
            _swal('Medico actualizado', medico.nombre , 'success');
            return resp.medico;
          });
    }
    else{
      //creando
      url += '?token=' + this.usuarioService.token;

      return this.Http.post(url, medico)
          .map( (resp: any) => {
              _swal('Medico creado', medico.nombre , 'success');
              return resp.medico;
          });
    }

  }

}
