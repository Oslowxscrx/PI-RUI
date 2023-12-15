import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Register } from 'src/app/interface/register/register';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  currentRegister = {} as Register;

  title = 'Nuevo Usuario';

  paramsSubscription!: Subscription;

  loading: boolean = true;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

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
      correoUsuario: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
          ],
        },
      ],
      contraseñaUsuario: ['', [Validators.required]],
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
}
