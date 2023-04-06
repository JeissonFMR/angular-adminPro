import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { UploadFileService } from '../../services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public perfilForm: FormGroup = new FormGroup({});
  public usuario: Usuario;
  public imagenSubir: File | undefined;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private uploadFileService: UploadFileService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe((res) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios guardados', 'success')
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error, 'error')
      })
  }


  cambiarImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement; // castear a HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) { // verificar que exista 'files'
      const file = inputElement.files[0];
      this.imagenSubir = file;
      // console.log(file, 'aaaaaa');
      if (!file) { return }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgTemp = reader.result;
      }
    }
  }


  subirImagen() {
    if (this.imagenSubir) { // verificar que imagenSubir no sea nulo
      this.uploadFileService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario._id)
        .then(img => {
          this.usuario.img = img
          Swal.fire('Guardado', 'IMagen de usuario guardada', 'success')
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error')

        });
    }
  }

}
