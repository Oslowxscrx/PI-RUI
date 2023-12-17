import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  register(user:User): Observable<User>{
    return this.http.post<User>( `${this.API_URL}/register`,
    user,
    this.httpOptions)
  }

}
