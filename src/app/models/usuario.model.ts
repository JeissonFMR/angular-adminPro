import { enviroment } from "src/enviroments/enviroment";

const api = enviroment.api

export class Usuario {
  constructor(
    public _id: string,
    public email: string,
    public nombre: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
  ) { }

  get imagenUrl() {
    if (this.img) {
      return `${api}/upload/usuarios/${this.img}`
    } else {
      return `${api}/upload/usuarios/no-image`
    }
  }
}