import { Injectable } from '@angular/core';
import { Department } from '../model/department';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService {

  department: Department;

  constructor(private http: HttpClient) {
    super();
  }

  newDepartment(department: Department): Observable<Department> {
    return this.http
      .post(`${this.UrlServiceV1}department`, department, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${this.UrlServiceV1}department`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllDepartmentsPaged(page, size): Observable<Page<Department>> {
    return this.http
      .get<Page<Department>>(`${this.UrlServiceV1}department?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findDepartmentById(id: string): Observable<Department> {
    return this.http
      .get<Department>(`${this.UrlServiceV1}department/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http
      .put(`${this.UrlServiceV1}department/${department.id}`, department, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteDepartment(id: string): Observable<Department> {
    return this.http
      .delete(`${this.UrlServiceV1}department/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
