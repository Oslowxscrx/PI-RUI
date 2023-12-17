import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/interface/user/users';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RolService } from 'src/app/service/roles.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  currentRegister = {} as User;

  users: User[] = [];
  title = 'Nuevo Registro';
  hide: boolean = true;
  paramsSubscription!: Subscription;

  loading: boolean = true;
  passwordEntered: boolean = false;

  // Variables de clase que son inyectadas por referencia
  // matcher = new MyErrorStateMatcher();

  public formGroup!: FormGroup;


  usuarioEditando = {
    nombre: '',
    email: '',
    contrasenia: '',
    rol: '',
    fechaCreacion: ''
  };

  usuarios: any[] = [];
  modalAbierto = false;
  roles: any[] = [];

  constructor(
    private rolesService: RolService,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private errorStateMatcher: ErrorStateMatcher
  ) { }

  errorMatcher = this.errorStateMatcher;

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.getUsuarios();
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
      contraseñaUsuario: ['', [Validators.required, Validators.minLength(8)]],
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
      this._router.navigate(['dashboard']);
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
  
  getRoles() {
    this.rolesService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  getUsuarios() {
    this.loading = true;
    this._usersService.getUsers().subscribe({
      next: (response: User[]) => {
        console.log('usuarios',response);
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
      this.users = response;
    this.loading = false;
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      console.error("Error al obtener usuarios:", error.error.message);
      this.users = error.error.data
    }
    this.loading = false;
  }

  guardarUsuario() {
    if (
      this.usuarioEditando.nombre &&
      this.usuarioEditando.email &&
      this.usuarioEditando.contrasenia &&
      this.usuarioEditando.rol
    ) {
      this.usuarioEditando.fechaCreacion = this.obtenerFechaActual();

      this._usersService.createUser(this.usuarioEditando).subscribe((data) => {
        this.usuarios.push(data);
        this.limpiarFormulario();
        this.modalAbierto = false;
      });
    }
  }

  editarUsuario(usuario: any, index: number) {
    this.usuarioEditando = { ...usuario };
    this.modalAbierto = true;
  }

  eliminarUsuario(index: number) {
    const usuario = this.usuarios[index];
    this._usersService.deleteUser(usuario.id).subscribe(() => {
      this.usuarios.splice(index, 1);
    });
  }

  limpiarFormulario() {
    this.usuarioEditando = {
      nombre: '',
      email: '',
      contrasenia: '',
      rol: '',
      fechaCreacion: ''
    };
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    return fecha.toISOString();
  }
}
