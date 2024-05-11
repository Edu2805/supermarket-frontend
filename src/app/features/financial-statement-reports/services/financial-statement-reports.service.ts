import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { FinancialSaleReport } from '../model/financial-sale-reports';
import { FinancialPurchaseReport } from '../model/financial-purchase-reports';

@Injectable({
  providedIn: 'root'
})
export class FinancialStatementReportsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getSaleReport(financialSaleReport: FinancialSaleReport): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/sales', financialSaleReport, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  getPurchaseReport(financialPurchaseReport: FinancialPurchaseReport): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/expensies', financialPurchaseReport, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }
}
