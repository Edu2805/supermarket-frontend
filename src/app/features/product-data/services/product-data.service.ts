import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ProductData } from '../model/product-data';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { UnityType } from '../model/unity-type';

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

  getAllProducts(page: number = 1, product: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}product?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = product.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllProducts(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }

  getAllProductsPaged(page, size): Observable<Page<ProductData>> {
    return this.http
      .get<Page<ProductData>>(`${this.UrlServiceV1}product?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllUnities(){
    let response = this.http.get<UnityType[]>(`${this.UrlServiceV1}unity`)
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


