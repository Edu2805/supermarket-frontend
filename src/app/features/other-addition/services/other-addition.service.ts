import { Injectable } from '@angular/core';
import { OtherAddition } from '../model/other-addition';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class OtherAdditionService extends BaseService {

  otherAddition: OtherAddition;

  constructor(private http: HttpClient) {
    super();
  }

  newOtherAddition(otherAddition: OtherAddition): Observable<OtherAddition> {
    return this.http
      .post(`${this.UrlServiceV1}otheraddition`, otherAddition, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllOtherAddition(): Observable<OtherAddition[]> {
    return this.http
      .get<OtherAddition[]>(`${this.UrlServiceV1}otheraddition`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllOtherAdditionPaged(page, size): Observable<Page<OtherAddition>> {
    return this.http
      .get<Page<OtherAddition>>(`${this.UrlServiceV1}otheraddition?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findOtherAdditionById(id: string): Observable<OtherAddition> {
    return this.http
      .get<OtherAddition>(`${this.UrlServiceV1}otheraddition/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateOtherAddition(otherAddition: OtherAddition): Observable<OtherAddition> {
    return this.http
      .put(`${this.UrlServiceV1}otheraddition/${otherAddition.id}`, otherAddition, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteOtherAddition(id: string): Observable<OtherAddition> {
    return this.http
      .delete(`${this.UrlServiceV1}otheraddition/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
