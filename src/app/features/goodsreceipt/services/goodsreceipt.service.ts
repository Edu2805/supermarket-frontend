import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { GoodsReceipt } from '../model/goodsreceipt';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class GoodsreceiptService extends BaseService {

  goodsReceipt: GoodsReceipt;

  constructor(private http: HttpClient) {
    super();
  }

  newGoodsReceipt(goodsReceipt: GoodsReceipt): Observable<GoodsReceipt> {
    return this.http
      .post(`${this.UrlServiceV1}goods-receipt`, goodsReceipt, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllGoodsReceipts(): Observable<GoodsReceipt[]> {
    return this.http
      .get<GoodsReceipt[]>(`${this.UrlServiceV1}goods-receipt`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllGoodsReceiptsPaged(page, size): Observable<Page<GoodsReceipt>> {
    return this.http
      .get<Page<GoodsReceipt>>(`${this.UrlServiceV1}goods-receipt?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findGoodsReceipById(id: string): Observable<GoodsReceipt> {
    return this.http
      .get<GoodsReceipt>(`${this.UrlServiceV1}goods-receipt/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateGoodsReceip(goodsReceipt: GoodsReceipt): Observable<GoodsReceipt> {
    return this.http
      .put(`${this.UrlServiceV1}goods-receipt/${goodsReceipt.id}`, goodsReceipt, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteGoodsReceip(id: string): Observable<GoodsReceipt> {
    return this.http
      .delete(`${this.UrlServiceV1}goods-receipt/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
