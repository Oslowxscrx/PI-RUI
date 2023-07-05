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

  usuarioIndex: number | null = null;
  usuarios: any[] = [];
  roles: string[] = [];

  constructor(private usersService: UsersService, private rolService: RolService) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerUsuarios() {
    this.usersService.getUsers().subscribe((res: any[]) => {
      this.usuarios = res;
    });
  }

  obtenerRoles() {
    this.rolService.getRoles().subscribe((res: any[]) => {
      this.roles = res;
    });
  }

  editarUsuario(usuario: any, index: number) {
    this.usuarioIndex = index;
    this.usuarioEditando = { ...usuario };
  }

  guardarUsuario() {
    if (this.usuarioIndex !== null) {
      this.usersService.updateUser(this.usuarioEditando).subscribe(() => {
        this.obtenerUsuarios();
      });
    } else {
      this.usersService.createUser(this.usuarioEditando).subscribe(() => {
        this.obtenerUsuarios();
      });
    }
    this.usuarioIndex = null;
    this.usuarioEditando = {
      nombre: '',
      email: '',
      contrasenia: '',
      rol: '',
      fechaCreacion: ''
    };
  }

  eliminarUsuario(index: number) {
    this.usersService.deleteUser(index).subscribe(() => {
      this.obtenerUsuarios();
    });
  }
}
