export interface User {
  id:number;
  nombreUsuario:string;
  correoUsuario:string;
  contraseñaUsuario:string;
  role:string;
  createdAt: Date;
  deletedAt: Date;
}
