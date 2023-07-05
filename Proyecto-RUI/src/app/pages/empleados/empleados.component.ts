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
  correoInvalido: boolean | undefined;
  nombreValido = true;
  apellidoValido = true;
  nombreInvalido = false;
  apellidoInvalido = false;

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
    //Verificar que la cedula contenga 10 digitos
    const cedulaValida = /^\d{10}$/.test(this.empleadoEditando.cedula);
    if (!cedulaValida) {
    // Mostrar mensaje de error o tomar la acción correspondiente
    console.log('La cédula debe contener exactamente 10 dígitos numéricos.');
    return;
    }
     // Verificar si el correo contiene una "@"
    if (!this.empleadoEditando.correo.includes('@')) {
    // Mostrar alerta de error
      this.correoInvalido = true;
    return;
    }
    
    
     // Verificar que el nombre y apellido solo contengan letras
      this.nombreInvalido = !/^[A-Za-z]+$/.test(this.empleadoEditando.nombre);
      this.apellidoInvalido = !/^[A-Za-z]+$/.test(this.empleadoEditando.apellido);
      if (this.nombreInvalido || this.apellidoInvalido) {
      // Mostrar alerta de error
      console.log('El nombre y el apellido solo pueden contener letras.');
      return;
      }
    
    
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
