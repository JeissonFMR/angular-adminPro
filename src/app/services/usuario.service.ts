import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../models/cargarUsuario';


const base_url = enviroment.api;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: any;
  public t = Usuario;


  constructor(private http: HttpClient, private router: Router) { }


  get token(): string {
    return localStorage.getItem('token') || ''
  }
  get uid(): string {
    return this.usuario._id || '';
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {
        console.log('respuesta de validar token 😀', res);
        const { _id, email, nombre, role, google, img } = res.usuario;
        this.usuario = new Usuario(_id, email, nombre, '', role, google, img);
        localStorage.setItem('token', res.msg)
        return true
      }),
      catchError(error => of(false))
    )
  }


  crearUsuario(formData: any) {
    return this.http.post(`${base_url}/usuarios`, formData)
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {


    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  logout() {
    localStorage.removeItem('token')

    this.router.navigateByUrl('/login')
  }

  loginUsuario(formData: any) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        map((res: any) => {
          localStorage.setItem('token', res.msg.token)
          return true
        })
      )
  }



  cargarUsuarios(desde: number = 0) {
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map(res => {
      // console.log(res);
      const usuarios = res.usuarios.map(user => new Usuario(user._id, user.email, user.nombre, '', user.role, user.google, user.img))
      return {
        totalUsuarios: res.totalUsuarios,
        usuarios
      }
    }))
  }


  eliminarUsuario(usuario: Usuario) {


    return this.http.delete(`${base_url}/usuarios/${usuario._id}`, {
      headers: {
        'x-token': this.token
      }
    })

  }


  actualizarRole(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data._id}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
