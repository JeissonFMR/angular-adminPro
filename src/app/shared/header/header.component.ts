import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: any


  constructor(private usuarioService: UsuarioService) {
    this.user = this.usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logout()
  }
}
