import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  public totalUusarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public pagina_desde: number = 0;


  public cargando: boolean = true



  miFormulario: FormGroup = new FormGroup({});


  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService,
    private fb: FormBuilder) {

    this.miFormulario = this.fb.group({
      buscar: ['']
    })

  }
  ngOnInit() {
    this.cargando = true
    this.usuarioService.cargarUsuarios(this.pagina_desde)
      .subscribe(({ totalUsuarios, usuarios }) => {

        this.totalUusarios = totalUsuarios;
        this.usuarios = usuarios;

        // console.log(totalUsuarios);
        this.cargando = false;
      })
  }


  cambiarPagina(valor: number) {
    this.pagina_desde += valor

    if (this.pagina_desde < 0) {
      this.pagina_desde = 0;
    } else if (this.pagina_desde > this.totalUusarios) {
      this.pagina_desde -= valor
    }

    this.cargando = true

    //cragar usuarios en la lista
    this.usuarioService.cargarUsuarios(this.pagina_desde)
      .subscribe(({ totalUsuarios, usuarios }) => {

        this.totalUusarios = totalUsuarios;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando = false;
      })
  }


  buscar() {
    const valor = this.miFormulario.get('buscar')?.value;
    // console.log('valorrrrrr', valor);
    // console.log(typeof (valor));

    if (valor.length === 0) {
      return;
    }

    this.busquedasService.buscar('usuarios', valor)
      .subscribe(res => {
        this.usuarios = res;
      });

  }


  eliminarUsuario(usuario: Usuario) {

    if (usuario._id === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error')
    }


    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe((res) => {
            this.cambiarPagina(0)
            Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado correctamente`, 'success')
          })
      }
    })
  }


  cambiarRole(usuario: Usuario) {

    this.usuarioService.actualizarRole(usuario)
      .subscribe((res) => {
        console.log(res);

      })
  }



  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirmodal('usuarios', usuario._id, usuario.img)
  }
}
