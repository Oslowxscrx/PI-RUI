import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private apiUrl = 'http://localhost:3000/insumos'; // Cambiar por la URL del archivo JSON

  constructor(private http: HttpClient) { }

  getInsumos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInsumo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createInsumo(insumo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, insumo);
  }

  updateInsumo(insumo: any): Observable<any> {
    const url = `${this.apiUrl}/${insumo.id}`;
    return this.http.put<any>(url, insumo);
  }

  deleteInsumo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
