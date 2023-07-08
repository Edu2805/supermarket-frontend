import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { SubSection } from '../model/subsection';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class SubsectionService extends BaseService {

  subsection: SubSection;

  constructor(private http: HttpClient) {
    super();
  }

  newSubsection(subsection: SubSection): Observable<SubSection> {
    return this.http
      .post(`${this.UrlServiceV1}subsection`, subsection, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllSubsections(): Observable<SubSection[]> {
    return this.http
      .get<SubSection[]>(`${this.UrlServiceV1}subsection`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllSubsectionsPaged(page, size): Observable<Page<SubSection>> {
    return this.http
      .get<Page<SubSection>>(`${this.UrlServiceV1}subsection?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findSubsectionById(id: string): Observable<SubSection> {
    return this.http
      .get<SubSection>(`${this.UrlServiceV1}subsection/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateSubsection(subsection: SubSection): Observable<SubSection> {
    return this.http
      .put(`${this.UrlServiceV1}subsection/${subsection.id}`, subsection, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deleteSubsection(id: string): Observable<SubSection> {
    return this.http
      .delete(`${this.UrlServiceV1}subsection/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}

