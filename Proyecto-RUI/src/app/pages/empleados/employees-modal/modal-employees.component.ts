import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/interface/employees/employee';
import { EmployeeService } from 'src/app/service/empleado.service';
import { ModalService } from 'src/app/service/modal/modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-employees',
  templateUrl: './modal-employees.component.html',
  styleUrls: ['./modal-employees.component.css']
})
export class ModalEmployeesComponent implements OnInit {
  
  currentEmployees = {} as Employee;

  title = 'Nuevo Empleado';
  hide: boolean = true;
  paramsSubscription!: Subscription;

  loading: boolean = true;
  passwordEntered: boolean = false;
  button: boolean = true;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;


  constructor(
    private _employeeService: EmployeeService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private errorStateMatcher: ErrorStateMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    public _dialogRef: MatDialogRef<ModalEmployeesComponent>,
    private modalCommunicationService: ModalService,
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    public dialogRef: MatDialogRef<ModalEmployeesComponent>,
    private location: Location
  ) { this.initForm(); }

  errorMatcher = this.errorStateMatcher;


  ngOnInit(): void {
    if (this.data && this.data.employeeId) {
      this.title = 'Editar Usuario'
      this.button = false;
      // Llama a un servicio para obtener la información del usuario por ID
      this.getEmployeeById(this.data.employeeId);
    } else {
      // Manejo adicional si no se proporciona un ID
      this.button = true;
    }
    this.modalCommunicationService.closeModal$.subscribe(() => {
      this._dialogRef.close();
    });
  }


  initForm() {
    this.formGroup = this._formBuilder.group({
      id:[0],
      cedula: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        },
      ],
      nombre: ['', [Validators.required, Validators.maxLength(16)]],
      apellido: ['', [Validators.required, Validators.maxLength(16)]],
      correo: ['', [Validators.required,  Validators.email]],
    }
  );

    this.formGroup.valueChanges.subscribe((val) => {
      this.currentEmployees = val;
      console.log(val);
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  getEmployeeById(id: number) {
    this.loading = true;
    this._employeeService.getEmployeeById(id).subscribe({
      next: (response: Employee) => {
        this.handleResponse(response);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private handleResponse(response: any): void {
    this.currentEmployees = response;
    this.formGroup.patchValue(this.currentEmployees);
    this.loading = false;
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      console.error("Error al obtener usuarios:", error.error.message);
      this.currentEmployees = error.error.data
    }
    this.loading = false;
  }

  public createEmployee() {
    this._employeeService.createEmployee(this.currentEmployees).subscribe((res: any) => {
      console.log(this.currentEmployees);
    });
  }

  public updateEmployee() {
    this._employeeService.updateEmployee(this.currentEmployees).subscribe((res: any) => {
      console.log('update',this.currentEmployees);
    });
  }

  closeModal() {
    this.modalCommunicationService.close();
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentEmployees.id) {
        this.createEmployee();
        console.log('entraaa crear')
        this.modalCommunicationService.close();
      } else {
        this.updateEmployee();
        console.log('entraaa editar')
        this.modalCommunicationService.close();
      }
    }
  }

  public onSubmitUpdate(): void {
      this.updateEmployee();
      console.log('entraaa crear')
      this.modalCommunicationService.close();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
