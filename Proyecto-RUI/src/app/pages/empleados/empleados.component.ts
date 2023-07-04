import { Component } from '@angular/core';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  empleadoEditando = {
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    fechaCreacion: ''
  };

  empleadoIndex: number | null = null;
  empleados: any[] = [];
  modalAbierto = false;

  constructor(private empleadoService: EmpleadoService) { }

  guardarEmpleado() {
    if (this.empleadoEditando.nombre && this.empleadoEditando.apellido && this.empleadoEditando.cedula && this.empleadoEditando.correo) {
      if (this.empleadoIndex !== null && this.empleadoIndex !== undefined) {
        // Editar empleado existente
        this.empleadoService.updateUser(this.empleadoEditando).subscribe(() => {
          if (this.empleadoIndex !== null && this.empleadoIndex !== undefined && this.empleados[this.empleadoIndex]) {
            this.empleados[this.empleadoIndex] = { ...this.empleadoEditando };
          }
          this.limpiarFormulario();
          this.modalAbierto = false;
        });
      } else {
        // Agregar nuevo empleado
        const fechaActual = new Date();
        this.empleadoEditando.fechaCreacion = fechaActual.toISOString();
        this.empleadoService.createUser(this.empleadoEditando).subscribe(() => {
          this.empleados.push({ ...this.empleadoEditando });
          this.limpiarFormulario();
          this.modalAbierto = false;
        });
      }
    }
  }
  

  editarEmpleado(empleado: any, index: number) {
    this.empleadoEditando = { ...empleado };
    this.empleadoIndex = index;
    this.modalAbierto = true;
  }

  eliminarEmpleado(index: number) {
    const empleado = this.empleados[index];
    if (empleado && empleado.id) {
      this.empleadoService.deleteUser(empleado.id).subscribe(() => {
        this.empleados.splice(index, 1);
      });
    }
  }

  limpiarFormulario() {
    this.empleadoEditando = {
      nombre: '',
      apellido: '',
      cedula: '',
      correo: '',
      fechaCreacion: ''
    };
  }
}
