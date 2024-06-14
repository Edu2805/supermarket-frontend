import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Provider } from '../model/provider';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { SubscriptionType } from '../model/subscription-type';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BaseService {

  provider: Provider;

  constructor(private http: HttpClient) {
    super();
  }

  newProvider(provider: Provider): Observable<Provider> {
    return this.http
      .post(`${this.UrlServiceV1}provider`, provider, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllProviders(page: number = 1, provider: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}provider?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = provider.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllProviders(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }

  getAllProvidersPaged(page, size): Observable<Page<Provider>> {
    return this.http
      .get<Page<Provider>>(`${this.UrlServiceV1}provider?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllSubscriptionTypes(){
    let response = this.http.get<SubscriptionType[]>(`${this.UrlServiceV1}subscription-type`)
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
  }

  findProviderById(id: string): Observable<Provider> {
    return this.http
      .get<Provider>(`${this.UrlServiceV1}provider/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateProvider(provider: Provider): Observable<Provider> {
    return this.http
      .put(`${this.UrlServiceV1}provider/${provider.id}`, provider, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteProvider(id: string): Observable<Provider> {
    return this.http
      .delete(`${this.UrlServiceV1}provider/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}

