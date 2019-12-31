import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/servicio.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
  }



}
