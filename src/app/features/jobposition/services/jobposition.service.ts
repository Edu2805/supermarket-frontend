import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { JobPosition } from '../model/jobposition';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class JobPositionService extends BaseService {

  jobposition: JobPosition;

  constructor(private http: HttpClient) {
    super();
  }

  newJobPosition(jobposition: JobPosition): Observable<JobPosition> {
    return this.http
      .post(`${this.UrlServiceV1}jobposition`, jobposition, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllJobPositions(): Observable<JobPosition[]> {
    return this.http
      .get<JobPosition[]>(`${this.UrlServiceV1}jobposition`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllJobPositionsPaged(page, size): Observable<Page<JobPosition>> {
    return this.http
      .get<Page<JobPosition>>(`${this.UrlServiceV1}jobposition?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findJobPositionById(id: string): Observable<JobPosition> {
    return this.http
      .get<JobPosition>(`${this.UrlServiceV1}jobposition/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateJobPosition(jobposition: JobPosition): Observable<JobPosition> {
    return this.http
      .put(`${this.UrlServiceV1}jobposition/${jobposition.id}`, jobposition, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteJobPosition(id: string): Observable<JobPosition> {
    return this.http
      .delete(`${this.UrlServiceV1}jobposition/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
