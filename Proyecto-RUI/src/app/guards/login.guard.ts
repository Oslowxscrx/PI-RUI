import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // Usuario no autenticado, puede acceder al login
      return true;
    } else {
      // Usuario autenticado, redirigir al dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
