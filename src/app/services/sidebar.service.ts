import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'PRINCIPAL',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: ' Graficas', url: 'grafica1' },
        { titulo: ' Promesas', url: 'promesas' },
        { titulo: ' Rxjs', url: 'rxjs' },
      ]
    },

    {
      titulo: 'MANTENIMIENTO',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: ' Médicos', url: 'medicos' }
      ]
    }
  ]
  constructor() { }
}
