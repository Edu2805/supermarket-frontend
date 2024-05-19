import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { FinancialSaleReport } from '../model/financial-sale-reports';
import { FinancialPurchaseReport } from '../model/financial-purchase-reports';
import { InputReportsDate } from '../model/Input-reports-date';

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

  getHistoricalSaleReport(input: InputReportsDate): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/sales/historical', input, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  getSalesDreReport(input: InputReportsDate): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/revenues/dre', input, this.GetHeaderJson())
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

  getHistoricalPurchaseReport(input: InputReportsDate): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/expensies/historical', input, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  getExpensiesDreReport(input: InputReportsDate): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + 'financial-report/expensies/dre', input, this.GetHeaderJson())
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }
}
