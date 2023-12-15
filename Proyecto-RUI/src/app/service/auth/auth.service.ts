import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/interface/register/register';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.API_URL + 'auth';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  register(register:Register): Observable<Register>{
    return this.http.post<Register>( `${this.API_URL}/register`,
    register,
    this.httpOptions)
  }

}
