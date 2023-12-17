import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  loading:boolean = false;
  loginForm: FormGroup;
  passwordEntered:boolean = false;

  constructor(
    private authHttpService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorStateMatcher: ErrorStateMatcher
  ) {
    this.loginForm = this.formBuilder.group({
      correoUsuario: ['', [Validators.required, Validators.email]],
      contraseñaUsuario: ['', [Validators.required]],
    });
  }

  errorMatcher = this.errorStateMatcher;

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { correoUsuario, contraseñaUsuario } = this.loginForm.value;
      this.authHttpService.login(correoUsuario, contraseñaUsuario).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success) {
            // Verifica que la propiedad 'success' sea verdadera
            this.router.navigate(['/dashboard']);
          } else {
            console.error(response.message); // Puedes mostrar un mensaje de error si 'success' es falso
          }
        },
        error: (error: any) => {
          console.error(error.message, error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
  

  onPasswordInput() {
    this.passwordEntered = this.loginForm.get('password')?.value.trim().length > 0;
  }


}
