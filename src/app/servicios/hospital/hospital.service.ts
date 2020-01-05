import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import _swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    hospital: Hospital;


  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) {

   }

  cargarHospitales(){

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);
  }

  obtenerHospitales(id: string){

    let url =  URL_SERVICIOS + '/hospital/' + id ;

    return this.http.get(url)
          .map( (resp: any) => resp.hospital);
  }

 borrarHospital(id: string){

  let url = URL_SERVICIOS + '/hospital/' + id;
  url += '?token=' + this.usuarioService.token;

  return this.http.delete(url)
        .map( (res: any) => {
          _swal('Hospital borrado', 'el Hopital ha sido eliminado correctamente' , 'success');
          return true;
        });

 }

 crearHospital(nombre: string){

  let url = URL_SERVICIOS + '/hospital';
  url += '?token=' + this.usuarioService.token;

  return this.http.post(url, {nombre})
          .map((resp: any) => {
            _swal('Hospital creado', 'Hospital creado correctamente' , 'success');
            return resp.hospital;
          })

 }
 buscarHospital(termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
        .map( (resp:any) => resp.hospitales);
 }

 actualizarHospital(hospital: Hospital){

  let url = URL_SERVICIOS + '/hospital/' + hospital._id;
  url += '?token=' + this.usuarioService.token;

  return this.http.put(url, hospital)
      .map( (resp:any) => {

        _swal('Hopital actualizado', hospital.nombre, 'success');
        return resp.hospital;

      });

 }


}
