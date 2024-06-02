import { Injectable } from '@angular/core';
import { UserDataDetailsOutput } from '../../account/models/user-data-details-output';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseService {

  userDataDetailOutput: UserDataDetailsOutput;

  constructor(private http: HttpClient) {
    super();
  }

  getAllUsersDataPaged(page, size): Observable<Page<UserDataDetailsOutput>> {
    return this.http
      .get<Page<UserDataDetailsOutput>>(`${this.UrlServiceV1}subsection?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findUserDataById(id: string): Observable<UserDataDetailsOutput> {
    return this.http
      .get<UserDataDetailsOutput>(`${this.UrlServiceV1}subsection/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateUserData(userDataDetailsOutput: UserDataDetailsOutput): Observable<UserDataDetailsOutput> {
    return this.http
      .put(`${this.UrlServiceV1}subsection/${userDataDetailsOutput.id}`, userDataDetailsOutput, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
