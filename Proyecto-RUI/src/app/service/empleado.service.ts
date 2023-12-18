import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Employee } from '../interface/employees/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = environment.API_URL + 'employees';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL,
    this.httpOptions);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL,
      employee,
      this.httpOptions)
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(
      `${this.API_URL}/${employee.id}`,
      employee,
      this.httpOptions
    );
  }

  public deleteEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.delete<Employee>(
      `${this.API_URL}/${employeeId}`,
      this.httpOptions
    );
  }
}
