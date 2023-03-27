import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';

const base_url = enviroment.api;

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  constructor() { }


  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: String) {

    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);


      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data);
      if (data.msg == 'Archivo subido') {
        return data.nombre
      } else {
        console.log(data.msg);
        return false;
      }

      return 'nomvbre de la img';
    } catch (error) {
      console.log(error);
      return false

    }
  }
}
