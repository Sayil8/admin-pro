import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {
    this. subscripcion = this.regresaObservable()
    .subscribe(
       num => console.log('Subs', num),
       error => console.log('eror en el obs', error),
       () => console.log('el observador termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
     return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval(() => {

        contador += 1;

        const salida = {
          valor: contador
        };
        observer.next(salida);

        // if (contador === 3) {
            // clearInterval(intervalo);
            // observer.complete();
        //  }

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter((valor, index) => {

        if( (valor % 2 ) === 1 ){
          return true;
        }else{
          return false;
        }
      })

    );
  }
}
