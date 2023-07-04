import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = ' http://localhost:3000/empleados';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmpleado(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createEmpleado(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateEmpleado(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<any>(url, user);
  }

  deleteEmpleado(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

