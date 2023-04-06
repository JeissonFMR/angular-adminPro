import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir: File | undefined;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService, public uploadFileService: UploadFileService) {

  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarmodal()
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



}
