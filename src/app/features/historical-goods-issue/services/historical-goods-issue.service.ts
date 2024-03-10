import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { SaleNumberInput } from '../model/salenumber-input';
import { HistoricalGoodsIssue } from '../model/historical-goods-issue';
import { Observable, catchError } from 'rxjs';
import { ProductData } from '../../product-data/model/product-data';

@Injectable({
  providedIn: 'root'
})
export class HistoricalGoodsIssueService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findHistoricalGoodsIssueBySaleNumber(saleNumberInput: SaleNumberInput): Observable<HistoricalGoodsIssue[]> {
    return this.http.post<HistoricalGoodsIssue[]>(`${this.UrlServiceV1}historical-goods-issue/invoice`, saleNumberInput,);
  }

  findProductBySourceId(id: string): Observable<ProductData[]> {
    return this.http
      .get<ProductData[]>(`${this.UrlServiceV1}historical-goods-issue/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
