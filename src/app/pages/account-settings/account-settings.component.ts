import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/servicios/servicio.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(
              // tslint:disable-next-line: variable-name
              public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colorCheck();
  }

  cambiarColor(color: string, link: any){
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(color);

  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colorCheck(){
    let tema = this._ajustes.ajustes.tema;
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }

  }

}
