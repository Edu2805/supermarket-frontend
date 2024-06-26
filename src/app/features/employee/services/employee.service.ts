import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Employee } from '../model/employee';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { EmployeeDetailsOutput } from '../model/employee-details-output';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  employee: Employee;

  constructor(private http: HttpClient) {
    super();
  }

  newEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post(`${this.UrlServiceV1}employee`, employee, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllEmployee(page: number = 1, employee: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}employee?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = employee.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllEmployee(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }

  getAllEmployeePaged(page, size): Observable<Page<Employee>> {
    return this.http
      .get<Page<Employee>>(`${this.UrlServiceV1}employee?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findEmployeeById(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.UrlServiceV1}employee/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findEmployeeDetailsOutputById(id: string): Observable<EmployeeDetailsOutput> {
    return this.http
      .get<EmployeeDetailsOutput>(`${this.UrlServiceV1}employee/employee-detail/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .put(`${this.UrlServiceV1}employee/${employee.id}`, employee, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http
      .delete(`${this.UrlServiceV1}employee/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
