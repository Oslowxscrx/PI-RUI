import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/service/roles.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioEditando = {
    nombre: '',
    email: '',
    contrasenia: '',
    rol: '',
    fechaCreacion: ''
  };

  usuarios: any[] = [];
  modalAbierto = false;
  roles: any[] = [];

  constructor(private rolesService: RolService, private usersService: UsersService) { }

  ngOnInit() {
    this.getRoles();
    this.getUsuarios();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  getUsuarios() {
    this.usersService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  guardarUsuario() {
    if (
      this.usuarioEditando.nombre &&
      this.usuarioEditando.email &&
      this.usuarioEditando.contrasenia &&
      this.usuarioEditando.rol
    ) {
      this.usuarioEditando.fechaCreacion = this.obtenerFechaActual();

      this.usersService.createUser(this.usuarioEditando).subscribe((data) => {
        this.usuarios.push(data);
        this.limpiarFormulario();
        this.modalAbierto = false;
      });
    }
  }

  editarUsuario(usuario: any, index: number) {
    this.usuarioEditando = { ...usuario };
    this.modalAbierto = true;
  }

  eliminarUsuario(index: number) {
    const usuario = this.usuarios[index];
    this.usersService.deleteUser(usuario.id).subscribe(() => {
      this.usuarios.splice(index, 1);
    });
  }

  limpiarFormulario() {
    this.usuarioEditando = {
      nombre: '',
      email: '',
      contrasenia: '',
      rol: '',
      fechaCreacion: ''
    };
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    return fecha.toISOString();
  }
}
