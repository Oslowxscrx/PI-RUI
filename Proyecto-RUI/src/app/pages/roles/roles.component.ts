import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  rolEditando = {
    nombre: '',
    descripcion: '',
    fechaCreacion: ''
  };

  rolIndex: number | null = null;
  roles: any[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  guardarRol() {
    if (this.rolEditando.nombre && this.rolEditando.descripcion) {
      if (this.rolIndex !== null && this.rolIndex !== undefined) {
        // Editar rol existente
        this.actualizarRol();
      } else {
        // Agregar nuevo rol
        this.crearRol();
      }
    }
  }

  crearRol() {
    const nuevoRol = { ...this.rolEditando };
    nuevoRol.fechaCreacion = new Date().toISOString();
    this.rolService.createRol(nuevoRol).subscribe(() => {
      this.roles.push(nuevoRol);
      this.limpiarFormulario();
    });
  }

  actualizarRol() {
    if (this.rolIndex !== null && this.rolIndex !== undefined) {
      const rolActualizado = { ...this.rolEditando };
      rolActualizado.fechaCreacion = new Date().toISOString();
      this.rolService.updateRol(rolActualizado).subscribe(() => {
        if (this.roles[this.rolIndex as number]) {
          this.roles[this.rolIndex as number] = rolActualizado;
        }
        this.limpiarFormulario();
      });
    }
  }

  editarRol(rol: any, index: number) {
    this.rolEditando = { ...rol };
    this.rolIndex = index;
  }

  eliminarRol(index: number) {
    const rol = this.roles[index];
    if (rol && rol.id) {
      this.rolService.deleteRol(rol.id).subscribe(() => {
        this.roles.splice(index, 1);
      });
    }
  }

  limpiarFormulario() {
    this.rolEditando = {
      nombre: '',
      descripcion: '',
      fechaCreacion: ''
    };
    this.rolIndex = null;
  }
}
