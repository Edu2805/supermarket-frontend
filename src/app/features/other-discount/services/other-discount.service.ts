import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { OtherDiscount } from '../model/other-discount';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class OtherDiscountService extends BaseService {

  otherDiscount: OtherDiscount;

  constructor(private http: HttpClient) {
    super();
  }

  newOtherDiscount(otherDiscount: OtherDiscount): Observable<OtherDiscount> {
    return this.http
      .post(`${this.UrlServiceV1}otherdiscount`, otherDiscount, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllOtherDiscount(): Observable<OtherDiscount[]> {
    return this.http
      .get<OtherDiscount[]>(`${this.UrlServiceV1}otherdiscount`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllOtherDiscountPaged(page, size): Observable<Page<OtherDiscount>> {
    return this.http
      .get<Page<OtherDiscount>>(`${this.UrlServiceV1}otherdiscount?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findOtherDiscountById(id: string): Observable<OtherDiscount> {
    return this.http
      .get<OtherDiscount>(`${this.UrlServiceV1}otherdiscount/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateOtherDiscount(otherDiscount: OtherDiscount): Observable<OtherDiscount> {
    return this.http
      .put(`${this.UrlServiceV1}otherdiscount/${otherDiscount.id}`, otherDiscount, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteOtherDiscount(id: string): Observable<OtherDiscount> {
    return this.http
      .delete(`${this.UrlServiceV1}otherdiscount/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
