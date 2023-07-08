import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Provider } from '../model/provider';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

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

  getAllProviders(): Observable<Provider[]> {
    return this.http
      .get<Provider[]>(`${this.UrlServiceV1}provider`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllProvidersPaged(page, size): Observable<Page<Provider>> {
    return this.http
      .get<Page<Provider>>(`${this.UrlServiceV1}provider?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
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

