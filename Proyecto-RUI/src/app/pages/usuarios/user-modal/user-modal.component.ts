import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interface/user/users';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ModalService } from 'src/app/service/modal/modal.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})

export class UserModalComponent implements OnInit {

  currentRegister = {} as User;

  title = 'Nuevo Usuario';
  hide: boolean = true;
  paramsSubscription!: Subscription;

  loading: boolean = true;
  passwordEntered: boolean = false;
  button: boolean = true;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;


  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private errorStateMatcher: ErrorStateMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    public _dialogRef: MatDialogRef<UserModalComponent>,
    private modalCommunicationService: ModalService,
    private _usersService: UsersService,
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    public dialogRef: MatDialogRef<UserModalComponent>
  ) { this.initForm(); }

  errorMatcher = this.errorStateMatcher;


  ngOnInit(): void {
    if (this.data && this.data.userId) {
      this.title = 'Editar Usuario'
      this.button = false;
      // Llama a un servicio para obtener la información del usuario por ID
      this.getUsuarioById(this.data.userId);
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
      nombreUsuario: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        },
      ],
      correoUsuario: ['', [Validators.required, Validators.email]],
      contraseñaUsuario: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: this.passwordMatchValidator
    });

    this.formGroup.valueChanges.subscribe((val) => {
      this.currentRegister = val;
      console.log(val);
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  getUsuarioById(id: number) {
    this.loading = true;
    this._usersService.getUserById(id).subscribe({
      next: (response: User) => {
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
    this.currentRegister = response;
    this.formGroup.patchValue(this.currentRegister);
    this.loading = false;
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      console.error("Error al obtener usuarios:", error.error.message);
      this.currentRegister = error.error.data
    }
    this.loading = false;
  }

  public createUser() {
    this._authService.register(this.currentRegister).subscribe((res: any) => {
      console.log(this.currentRegister);
    });
  }

  public updateUser() {
    this._usersService.updateUsuario(this.currentRegister).subscribe((res: any) => {
      console.log('update',this.currentRegister);
    });
  }

  closeModal() {
    this.modalCommunicationService.close();
  }

  // onSubmit(): void {
  //   if (this.formGroup.valid) {
  //     this.createUser();
  //     this.modalCommunicationService.close();
  //   }
  // }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      if (!this.currentRegister.id) {
        this.createUser();
        console.log('entraaa crear')
        this.modalCommunicationService.close();
      } else {
        this.updateUser();
        console.log('entraaa editar')
        this.modalCommunicationService.close();
      }
    }
  }

  public onSubmitUpdate(): void {
      this.updateUser();
      console.log('entraaa crear')
      this.modalCommunicationService.close();
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('contraseñaUsuario')?.value;
    const confirmPassword = formGroup.get('confirmarContraseña')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmarContraseña')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmarContraseña')?.setErrors(null);
    }

    return null;
  }


  onPasswordInput() {
    this.passwordEntered = this.formGroup.get('contraseñaUsuario')?.value.trim().length > 0;
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

}
