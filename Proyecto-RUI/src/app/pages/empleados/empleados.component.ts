import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employees/employee';
import { EmployeeService } from 'src/app/service/empleado.service';
import { ModalEmployeesComponent } from './employees-modal/modal-employees.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = true;

  constructor(private _employeeService: EmployeeService, 
    private _dialog: MatDialog,) 
  
  { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.loading = true;
    this._employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        console.log('empleados',response);
        this.handleResponse(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  private handleResponse(response: any): void {
    this.employees = response;
  this.loading = false;
}

private handleError(error: any): void {
  if (error.status === 404) {
    console.error("Error al obtener empleado:", error.error.message);
    this.employees = error.error.data
  }
  this.loading = false;
}

openModal(): void {
  const dialogRef = this._dialog.open(ModalEmployeesComponent, {
    height: '580px',
    width: '550px',
    data: { /* datos que deseas pasar al componente de contenido del modal */ }
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Realizar acciones después de cerrar el modal
    }
  });
}

abrirModalParaEditar(employeeId: number): void {
  const dialogRef = this._dialog.open(ModalEmployeesComponent, {
    height: '580px',
    width: '550px',
    data: { employeeId: employeeId },
  });
}

deleteUser(employee: Employee): void {
  this._employeeService.deleteEmployeeById(employee.id)
    .pipe(
      finalize(() => {
        // this._router.navigate(['/system/usuarios']);
      })
    )
    .subscribe((res: any) => {
      if (res.status === 'success') {
        this.handleResponse(res);
      }
    });
}


openDialogDeleteEmployee(employee: Employee): void {
  const dialogRef = this._dialog.open(ModalDeleteComponent, {
    height: '350px',
    width: '700px',
    data: {
      title: '¿ Está seguro de eliminar este usuario ?',
      message:
        'El usuario sera eliminado definitivamente del sistema.',
      button: 'Eliminar',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.deleteUser(employee);
    }
    });
  }
}
