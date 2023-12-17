import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthCookieStorage } from 'src/app/auth/validator/auth-cookie-storage';
import { AuthSessionStorage } from 'src/app/auth/validator/auth-session-storage';
import { AuthValidator } from 'src/app/auth/validator/auth-validator';
import { User } from 'src/app/interface/user/users';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.API_URL + 'auth';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private authSessionStorage: AuthSessionStorage,
    private authCookieStorage: AuthCookieStorage,
    private authValidator: AuthValidator,
  ) { }

  isAuthenticated(): boolean {
    return this.authValidator.isTokenValid(
      this.authCookieStorage.getRefreshToken()
    );
  }

  

  isAuthorized(permissions: string[]): boolean {
    const token = this.authCookieStorage.getRefreshToken();
    return this.authValidator.hasPermission(token, permissions);
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/register`,
      user,
      this.httpOptions)
  }

  login(correoUsuario: string, contraseñaUsuario: string): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/login`, { correoUsuario, contraseñaUsuario }, this.httpOptions)
      .pipe(
        map((response) => {
          console.log('token', response.success.token);  // Aquí accedes al token
          this.authSessionStorage.setAccessToken(response.success.token);
          this.authCookieStorage.setRefreshToken(response.success.token);
          return response;
        }),
        catchError(this.handleError<any>('login'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
