import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarseg().then(
      mensaje => console.log('termino', mensaje))
    .catch(
      error => console.error('error', error));

  }

  ngOnInit() {
  }

  contarseg(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          resolve(true);
          // reject("error simpel");
          clearInterval(interval);
        }
      }, 1000 );

    });

  }

}
