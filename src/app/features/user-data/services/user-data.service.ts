import { Injectable } from '@angular/core';
import { UserDataDetailsOutput } from '../../account/models/user-data-details-output';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Page } from 'src/app/utils/pagination/model/models';
import { ApproveUserInput } from '../model/approve-user-input';
import { ApproveUserDataOutput } from '../model/approve-user-output';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseService {

  userDataDetailOutput: UserDataDetailsOutput;

  constructor(private http: HttpClient) {
    super();
  }

  getAllUsersDataPaged(page, size): Observable<Page<ApproveUserDataOutput>> {
    return this.http
      .get<Page<ApproveUserDataOutput>>(`${this.UrlServiceV1}user/get-users-not-approved?page=${page}&size=${size}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  findUserDataById(id: string): Observable<ApproveUserDataOutput> {
    return this.http
      .get<ApproveUserDataOutput>(`${this.UrlServiceV1}user/hr/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  updateUserData(id: string, approveUserInput: ApproveUserInput): Observable<ApproveUserDataOutput> {
    return this.http
      .put(`${this.UrlServiceV1}user/change-approve-status/${id}`, approveUserInput, super.GetHeaderJson())
      .pipe(
        map(super.extractDataAuth),
        catchError(super.serviceError));
  }
}
