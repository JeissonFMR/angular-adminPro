import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';


const base_url = enviroment.api;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.msg)
      }), map(res => true),
      catchError(error => of(false))
    )
  }


  crearUsuario(formData: any) {
    return this.http.post(`${base_url}/usuarios`, formData)
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
}
