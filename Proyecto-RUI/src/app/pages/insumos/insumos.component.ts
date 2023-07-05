import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { InsumoService } from 'src/app/service/insumos.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  insumoEditando = {
    codigo: '',
    nombre: '',
    descripcion: '',
    asignadoA: '',
    fechaCreacion: ''
  };

  insumoIndex: number | null = null;
  insumos: any[] = [];
  modalAbierto = false;

  empleados: any[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private insumoService: InsumoService
  ) { }

  ngOnInit() {
    this.getEmpleados();
    this.getInsumos();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  getInsumos() {
    this.insumoService.getInsumos().subscribe((data) => {
      this.insumos = data;
    });
  }

  guardarInsumo() {
    if (this.insumoEditando.codigo && this.insumoEditando.nombre && this.insumoEditando.descripcion && this.insumoEditando.asignadoA) {
      if (this.insumoIndex !== null && this.insumoIndex !== undefined) {
        this.insumos[this.insumoIndex] = { ...this.insumoEditando };
        this.insumoService.updateInsumo(this.insumoEditando).subscribe(() => {
          this.limpiarFormulario();
          this.modalAbierto = false;
        });
      } else {
        this.insumoEditando.fechaCreacion = this.obtenerFechaActual();
        this.insumoService.createInsumo(this.insumoEditando).subscribe((data) => {
          this.insumos.push(data);
          this.limpiarFormulario();
          this.modalAbierto = false;
        });
      }
    }
  }

  editarInsumo(insumo: any, index: number) {
    this.insumoEditando = { ...insumo };
    this.insumoIndex = index;
    this.modalAbierto = true;
  }

  eliminarInsumo(index: number) {
    const insumo = this.insumos[index];
    this.insumoService.deleteInsumo(insumo.id).subscribe(() => {
      this.insumos.splice(index, 1);
    });
  }

  limpiarFormulario() {
    this.insumoEditando = {
      codigo: '',
      nombre: '',
      descripcion: '',
      asignadoA: '',
      fechaCreacion: ''
    };
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    return fecha.toISOString(); // Formato ISO de la fecha
  }
}
