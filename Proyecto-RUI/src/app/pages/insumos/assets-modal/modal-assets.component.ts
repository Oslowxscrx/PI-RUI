import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/service/modal/modal.service';
import { Location } from '@angular/common';
import { Assets } from 'src/app/interface/assets/assets';
import { AssetsService } from 'src/app/service/insumos.service';
import { EmployeeService } from 'src/app/service/empleado.service';
import { Employee } from 'src/app/interface/employees/employee';

@Component({
  selector: 'app-modal-assets',
  templateUrl: './modal-assets.component.html',
  styleUrls: ['./modal-assets.component.css']
})
export class ModalAssetsComponent implements OnInit {
  
  currentAssets = {} as Assets;

  title = 'Nuevo Insumo';
  hide: boolean = true;
  paramsSubscription!: Subscription;

  loading: boolean = true;
  passwordEntered: boolean = false;
  button: boolean = true;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;

  employees: Employee[] = [];
  fechaAsignacion: Date = new Date();


  constructor(private _employeeService: EmployeeService,
    private _assetService: AssetsService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private errorStateMatcher: ErrorStateMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    public _dialogRef: MatDialogRef<ModalAssetsComponent>,
    private modalCommunicationService: ModalService,
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { assetId: number },
    public dialogRef: MatDialogRef<ModalAssetsComponent>,
    private location: Location
  ) {  
    this.initForm(); 
  }

  errorMatcher = this.errorStateMatcher;

  ngOnInit(): void {
    if (this.data && this.data.assetId) {
      this.title = 'Editar Insumo'
      this.button = false;
      // Llama a un servicio para obtener la información del usuario por ID
      this.getAssetById(this.data.assetId);
    } else {
      // Manejo adicional si no se proporciona un ID
      this.button = true;
    }
    this.modalCommunicationService.closeModal$.subscribe(() => {
      this._dialogRef.close();
    });

    this._employeeService.getEmployees().subscribe((employee: Employee[]) => {
      this.employees = employee;
    });
    this.fechaAsignacion = new Date();
  }


  initForm() {
    this.formGroup = this._formBuilder.group({
      id:[0],
      codigo: [
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
      descripcion: ['', [Validators.required, Validators.maxLength(16)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),]],
      vidaUtil: ['', [Validators.required, Validators.maxLength(10)]],
    }
  );

    this.formGroup.valueChanges.subscribe((val) => {
      this.currentAssets = val;
      console.log(val);
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  getAssetById(id: number) {
    this.loading = true;
    this._assetService.getAssetById(id).subscribe({
      next: (response: Assets) => {
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
    this.currentAssets = response;
    this.formGroup.patchValue(this.currentAssets);
    this.loading = false;
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      console.error("Error al obtener insumos:", error.error.message);
      this.currentAssets = error.error.data
    }
    this.loading = false;
  }

  public createAsset() {
    this._assetService.createAsset(this.currentAssets).subscribe((res: any) => {
      console.log(this.currentAssets);
    });
  }

  public updateAsset() {
    this._assetService.updateAsset(this.currentAssets).subscribe((res: any) => {
      console.log('update',this.currentAssets);
    });
  }

  closeModal() {
    this.modalCommunicationService.close();
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentAssets.id) {
        this.createAsset();
        console.log('entraaa crear')
        this.modalCommunicationService.close();
      } else {
        this.updateAsset();
        console.log('entraaa editar')
        this.modalCommunicationService.close();
      }
    }
  }

  public onSubmitUpdate(): void {
      this.updateAsset();
      console.log('entraaa crear')
      this.modalCommunicationService.close();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
  submitForm() {
    const formValues = this.formGroup.value;
    formValues.fechaAsignacion = new Date();

    // Luego envía formValues a tu servidor o servicio
    // Por ejemplo, si tienes un método saveAsset en tu servicio _assetService, puedes hacer algo como esto:
    this._assetService.saveAsset(formValues).subscribe(response => {
      // Maneja la respuesta del servidor aquí
    });
  }
}
