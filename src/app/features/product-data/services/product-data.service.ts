import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ProductData } from '../model/product-data';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService extends BaseService {

  productData: ProductData;

  constructor(private http: HttpClient) {
    super();
  }

  newProduct(productData: ProductData): Observable<ProductData> {
    return this.http
      .post(`${this.UrlServiceV1}product`, productData, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllProducts(): Observable<ProductData[]> {
    return this.http
      .get<ProductData[]>(`${this.UrlServiceV1}product`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllProductsPaged(page, size): Observable<Page<ProductData>> {
    return this.http
      .get<Page<ProductData>>(`${this.UrlServiceV1}product?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllUnities(){
    let response = this.http.get<string[]>(`${this.UrlServiceV1}unity`)
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
  }

  searchProducts(code?:string, name?: string) {
    if(code !== null) {
      return this.http
        .get<ProductData[]>(`${this.UrlServiceV1}product/filter?ean13=${code}`, super.GetHeaderJson())
        .pipe(catchError(super.serviceError));
    } 
  }

  findProductById(id: string): Observable<ProductData> {
    return this.http
      .get<ProductData>(`${this.UrlServiceV1}product/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateProduct(productData: ProductData): Observable<ProductData> {
    return this.http
      .put(`${this.UrlServiceV1}product/${productData.id}`, productData, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteProduct(id: string): Observable<ProductData> {
    return this.http
      .delete(`${this.UrlServiceV1}product/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}


