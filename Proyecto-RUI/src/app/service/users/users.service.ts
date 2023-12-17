import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { User } from 'src/app/interface/user/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.API_URL + 'users';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl,
    this.httpOptions);
  }

  getUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<any>(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
