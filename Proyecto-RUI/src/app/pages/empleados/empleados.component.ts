import { Component } from '@angular/core';

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

  guardarEmpleado() {
    if (this.empleadoEditando.nombre && this.empleadoEditando.apellido && this.empleadoEditando.cedula && this.empleadoEditando.correo) {
      if (this.empleadoIndex !== null && this.empleadoIndex !== undefined) {
        // Editar empleado existente
        this.empleados[this.empleadoIndex] = { ...this.empleadoEditando };
      } else {
        // Agregar nuevo empleado
        const fechaActual = new Date();
        this.empleadoEditando.fechaCreacion = fechaActual.toISOString();
        this.empleados.push({ ...this.empleadoEditando });
      }

      this.limpiarFormulario();
      this.modalAbierto = false;
    }
  }

  editarEmpleado(empleado: any, index: number) {
    this.empleadoEditando = { ...empleado };
    this.empleadoIndex = index;
    this.modalAbierto = true;
  }

  eliminarEmpleado(index: number) {
    this.empleados.splice(index, 1);
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
