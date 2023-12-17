import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { InvoiceInput } from '../model/invoice-input';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs';
import { HistoricalGoodsReceipt } from '../model/historical-goods-receipt';
import { ProductData } from '../../product-data/model/product-data';

@Injectable({
  providedIn: 'root'
})
export class HistoricalGoodsReceiptService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findHistoricalGoodsReceipByInvoice(invoiceInput: InvoiceInput): Observable<HistoricalGoodsReceipt[]> {
    return this.http.post<HistoricalGoodsReceipt[]>(`${this.UrlServiceV1}historical-goods-receipt/invoice`, invoiceInput,);
  }

  findProductBySourceId(id: string): Observable<ProductData[]> {
    return this.http
      .get<ProductData[]>(`${this.UrlServiceV1}historical-goods-receipt/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
