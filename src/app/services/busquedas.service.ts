import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { CargarUsuario } from '../models/cargarUsuario';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';


const base_url = enviroment.api;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {



  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  private tranformarUsuarios(resultados: any[]): Usuario[] {


    return resultados.map(
      user => new Usuario(user._id, user.email, user.nombre, '', user.role, user.google, user.img)
    )
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.tranformarUsuarios(res.resultados)

            default:
              return [];
          }
        })
      )
  }
}
