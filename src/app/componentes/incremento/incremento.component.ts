import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incremento',
  templateUrl: './incremento.component.html',
  styles: []
})
export class IncrementoComponent implements OnInit {

 @ViewChild('txt', {static: false}) txt: ElementRef;
 // tslint:disable-next-line: no-input-rename
 @Input('nombre') porcentaje: number = 75;
 @Input()  leyenda: string = 'leyenda';

 @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(event: number) {

    //let elementHTML = document.getElementsByName('porcentaje')[0];

    if (event >= 100) {
      this.porcentaje = 100;
    } else if ( event <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = event;
    }

    //elementHTML.value = this.porcentaje;
    this.txt.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);

    this.txt.nativeElement.focus();
  }

  cambiarValor(numero: number) {
    if (this.porcentaje >= 100 && numero > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && numero < 0) {
      this.porcentaje = 0;
      return;
   }
    this.porcentaje += numero;
    this.cambioValor.emit(this.porcentaje);
 }
}
