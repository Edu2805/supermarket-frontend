import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { MainSection } from '../model/mainsection';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class MainsectionService extends BaseService {

  mainsection: MainSection;

  constructor(private http: HttpClient) {
    super();
  }

  newMainsection(mainsection: MainSection): Observable<MainSection> {
    return this.http
      .post(`${this.UrlServiceV1}mainsection`, mainsection, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllMainsections(): Observable<MainSection[]> {
    return this.http
      .get<MainSection[]>(`${this.UrlServiceV1}mainsection`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllMainsectionsPaged(page, size): Observable<Page<MainSection>> {
    return this.http
      .get<Page<MainSection>>(`${this.UrlServiceV1}mainsection?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findMainsectionById(id: string): Observable<MainSection> {
    return this.http
      .get<MainSection>(`${this.UrlServiceV1}mainsection/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateMainsection(mainsection: MainSection): Observable<MainSection> {
    return this.http
      .put(`${this.UrlServiceV1}mainsection/${mainsection.id}`, mainsection, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteMainsection(id: string): Observable<MainSection> {
    return this.http
      .delete(`${this.UrlServiceV1}mainsection/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
