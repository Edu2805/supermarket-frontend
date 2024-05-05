import { Injectable } from '@angular/core';
import { GoodsIssue } from '../model/Goodsissue';
import { Page } from 'src/app/utils/pagination/model/models';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsissueService extends BaseService {

  goodsIssue: GoodsIssue;

  constructor(private http: HttpClient) {
    super();
  }

  newGoodsIssue(goodsIssue: GoodsIssue): Observable<GoodsIssue> {
    return this.http
      .post(`${this.UrlServiceV1}goods-issue`, goodsIssue, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllGoodsIssues(): Observable<GoodsIssue[]> {
    return this.http
      .get<GoodsIssue[]>(`${this.UrlServiceV1}goods-issue`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllGoodsIssuesPaged(page, size): Observable<Page<GoodsIssue>> {
    return this.http
      .get<Page<GoodsIssue>>(`${this.UrlServiceV1}goods-issue?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllPaymentOptions(){
    let response = this.http.get<string[]>(this.UrlServiceV1 + 'payment-options')
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
  }

  getSaleInformation(employeeLogin: string): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'saleinformation', { employeeLogin: employeeLogin }, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  getSaleNumber(): Observable<number> {
    return this.http
      .get<number>(`${this.UrlServiceV1}salenumber`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findGoodsIssueById(id: string): Observable<GoodsIssue> {
    return this.http
      .get<GoodsIssue>(`${this.UrlServiceV1}goods-issue/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateGoodsIssue(goodsIssue: GoodsIssue): Observable<GoodsIssue> {
    return this.http
      .put(`${this.UrlServiceV1}goods-issue/${goodsIssue.id}`, goodsIssue, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteGoodsIssue(id: string): Observable<GoodsIssue> {
    return this.http
      .delete(`${this.UrlServiceV1}goods-issue/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
