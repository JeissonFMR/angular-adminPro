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
}