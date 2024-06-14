import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { ScholarityType } from '../model/scholarity-type';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService {

  person: Person;

  constructor(private http: HttpClient) {
    super();
  }

  newPerson(person: Person): Observable<Person> {
    return this.http
      .post(`${this.UrlServiceV1}person`, person, this.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  getAllPeople(page: number = 1, people: any[] = []): Observable<any[]> {
    return this.http.get<{content: any[], totalElements: number, size: number}>(`${this.UrlServiceV1}person?page=${page}`).pipe(
      mergeMap(response => {
        const retrieve = people.concat(response.content);
        const totalPages = Math.ceil(response.totalElements / response.size);
        if (page < totalPages) {
          return this.getAllPeople(page + 1, retrieve);
        } else {
          return of(retrieve);
        }
      })
    );
  }

  getAllPeoplePaged(page, size): Observable<Page<Person>> {
    return this.http
      .get<Page<Person>>(`${this.UrlServiceV1}person?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllPeopleAvaiable(): Observable<Person[]> {
    return this.http
      .get<Person[]>(`${this.UrlServiceV1}person/peopleavailable`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findPersonById(id: string): Observable<Person> {
    return this.http
      .get<Person>(`${this.UrlServiceV1}person/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllEducations(){
    let response = this.http.get<ScholarityType[]>(`${this.UrlServiceV1}scholarity`)
    .pipe(
        map(this.extractData),
        catchError(this.serviceError));
    return response;
}

  updatePerson(person: Person): Observable<Person> {
    return this.http
      .put(`${this.UrlServiceV1}person/${person.id}`, person, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }

  deletePerson(id: string): Observable<Person> {
    return this.http
      .delete(`${this.UrlServiceV1}person/${id}`, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
