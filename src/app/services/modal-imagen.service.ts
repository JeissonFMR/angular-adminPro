import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';


const base_url = enviroment.api
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;


  public tipo: 'usuarios' | 'medicos' | 'hospital' = 'usuarios';
  public id: string = ''
  public img: string = ''

  constructor() { }


  get ocultarModal() {
    return this._ocultarModal
  }


  abrirmodal(tipo: 'usuarios' | 'medicos' | 'hospital', id: string, img: string = 'no-image') {
    this._ocultarModal = false


    // http://localhost:3002/api/upload/usuarios/6404f6671eb602fa3213eae0



    this.tipo = tipo;
    this.id = id;

    if (!img.includes('https')) {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
    // if (typeof img !== "undefined") {
    //   this.img = img; // Asignar img solo si no es undefined
    // } else {
    //   return // Asignar un valor predeterminado si img es undefined
    // }
  }

  cerrarmodal() {
    this._ocultarModal = true
  }
}
