import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  manuItems: any;
  user: any
  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {

    this.user = this.usuarioService.usuario

    this.manuItems = sidebarService.menu
    console.log(this.manuItems);
  }
}
