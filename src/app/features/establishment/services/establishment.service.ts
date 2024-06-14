import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Establishment } from '../model/establishment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable()
export class EstablishmentService extends BaseService {

  establishment: Establishment;

  constructor(private http: HttpClient) {
    super();
  }

  newEstablishment(establishment: Establishment): Observable<Establishment> {
    return this.http
      .post(`${this.UrlServiceV1}establishment`, establishment, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllEstablishments(page: number = 1, establishment: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}establishment?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = establishment.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllEstablishments(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }

  getAllEstablishmentsPaged(page, size): Observable<Page<Establishment>> {
    return this.http
      .get<Page<Establishment>>(`${this.UrlServiceV1}establishment?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findEstablishmentById(id: string): Observable<Establishment> {
    return this.http
      .get<Establishment>(`${this.UrlServiceV1}establishment/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateEstablishment(establishment: Establishment): Observable<Establishment> {
    return this.http
      .put(`${this.UrlServiceV1}establishment/${establishment.id}`, establishment, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteEstablishment(id: string): Observable<Establishment> {
    return this.http
      .delete(`${this.UrlServiceV1}establishment/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
