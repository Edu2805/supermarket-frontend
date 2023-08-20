import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

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

  getAllPeople(): Observable<Person[]> {
    return this.http
      .get<Person[]>(`${this.UrlServiceV1}person`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllPeoplePaged(page, size): Observable<Page<Person>> {
    return this.http
      .get<Page<Person>>(`${this.UrlServiceV1}person?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findPersonById(id: string): Observable<Person> {
    return this.http
      .get<Person>(`${this.UrlServiceV1}person/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAllEducations(){
    let response = this.http.get<string[]>(`${this.UrlServiceV1}scholarity`)
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
