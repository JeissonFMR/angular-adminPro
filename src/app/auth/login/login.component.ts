import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public formSubmitted = false

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  },);

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) {
  }
  login() {

    // console.log(this.loginForm.value.remember);
    const a: any = this.loginForm.get('email')?.value
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe((resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', a);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(['/dashboard'])

      }, (error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error')
      })
  }
}
