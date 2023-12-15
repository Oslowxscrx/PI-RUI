import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Register } from 'src/app/interface/register/register';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  currentRegister = {} as Register;

  title = 'Registro';
  hide:boolean = true;
  paramsSubscription!: Subscription;

  loading: boolean = true;
  passwordEntered:boolean = false;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private errorStateMatcher: ErrorStateMatcher
  ) { }

  errorMatcher = this.errorStateMatcher;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this._formBuilder.group({
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
      contraseñaUsuario: ['', [Validators.required, Validators.minLength(5)]],
      // confirmarContraseña: ['', [Validators.required]],
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

  public createUser() {
    this._authService.register(this.currentRegister).subscribe((res: any) => {
      console.log(this.currentRegister);
      this._router.navigate(['login']);
    });
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.createUser();
    }
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

}
