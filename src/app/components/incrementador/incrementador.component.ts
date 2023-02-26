import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary'


  @Output() valorSlida: EventEmitter<number> = new EventEmitter()

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSlida.emit(100 - 5)
      this.progreso = 100 - 5
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSlida.emit(0 + 5)
      this.progreso = 0 + 5
    }
    this.progreso = this.progreso + valor
    this.valorSlida.emit(this.progreso)
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0
    } else {
      this.progreso = nuevoValor
    }
    this.valorSlida.emit(this.progreso)
  }
}
