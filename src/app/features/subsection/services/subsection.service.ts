import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { SubSection } from '../model/subsection';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
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

  getAllSubsections(page: number = 1, subSections: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}subsection?page=${page}`).pipe(
      mergeMap(response => {
        const retrievedSubSections = subSections.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllSubsections(page + 1, retrievedSubSections);
        } else {
          return of(retrievedSubSections);
        }
      })
    );
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

