import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
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

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  guardarEmpleado() {
    if (this.empleadoEditando.nombre && this.empleadoEditando.apellido && this.empleadoEditando.cedula && this.empleadoEditando.correo) {
      if (this.empleadoIndex !== null && this.empleadoIndex !== undefined) {
        // Editar empleado existente
        this.empleadoService.updateEmpleado(this.empleadoEditando).subscribe(() => {
          if (this.empleadoIndex !== null && this.empleadoIndex !== undefined && this.empleados[this.empleadoIndex]) {
            this.empleados[this.empleadoIndex] = { ...this.empleadoEditando };
          }
          this.limpiarFormulario();
          this.modalAbierto = false;
          this.getEmpleados(); // Actualizar lista de empleados
        });
      } else {
        // Agregar nuevo empleado
        const fechaActual = new Date();
        this.empleadoEditando.fechaCreacion = fechaActual.toISOString();
        this.empleadoService.createEmpleado(this.empleadoEditando).subscribe(() => {
          this.empleados.push({ ...this.empleadoEditando });
          this.limpiarFormulario();
          this.modalAbierto = false;
          this.getEmpleados(); // Actualizar lista de empleados
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
      this.empleadoService.deleteEmpleado(empleado.id).subscribe(() => {
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
