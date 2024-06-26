import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Salary } from '../model/salary';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { SalaryDTO } from '../dto/salaryDTO';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends BaseService {

  salary: Salary;

  constructor(private http: HttpClient) {
    super();
  }

  newSalary(salary: Salary): Observable<Salary> {
    return this.http
      .post(`${this.UrlServiceV1}salary`, salary, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllSalary(page: number = 1, salary: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}salary?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = salary.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllSalary(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }
  
  getAllDepartments(arg0: number, retrieve: any[]): any {
    throw new Error('Method not implemented.');
  }

  getAllSalaryPaged(page, size): Observable<Page<Salary>> {
    return this.http
      .get<Page<Salary>>(`${this.UrlServiceV1}salary?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findSalaryById(id: string): Observable<Salary> {
    return this.http
      .get<Salary>(`${this.UrlServiceV1}salary/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllSalariesAvailable(): Observable<SalaryDTO[]> {
    return this.http
      .get<SalaryDTO[]>(`${this.UrlServiceV1}salary/salariesavailable`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateSalary(salary: Salary): Observable<Salary> {
    return this.http
      .put(`${this.UrlServiceV1}salary/${salary.id}`, salary, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteSalary(id: string): Observable<Salary> {
    return this.http
      .delete(`${this.UrlServiceV1}salary/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
