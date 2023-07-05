import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRol(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createRol(rol: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rol);
  }

  updateRol(rol: any): Observable<any> {
    const url = `${this.apiUrl}/${rol.id}`;
    return this.http.put<any>(url, rol);
  }

  deleteRol(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
