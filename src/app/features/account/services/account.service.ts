import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserData } from "../models/user-data";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { BaseService } from "src/app/services/base.service";
import { AuthUser } from "../models/auth-user";
import { UserNameData } from "../models/username-data";
import { UserDataDetailsOutput } from "../models/user-data-details-output";
import { ChangePassword } from "../models/change-password";

@Injectable()
export class AccountService extends BaseService { 

    constructor(private http: HttpClient) { 
        super();
    }

    getAllUsersIsNotEmployee(): Observable<UserData[]> {
        return this.http
          .get<UserData[]>(`${this.UrlServiceV1}user/user-is-not-employee`, super.GetHeaderJson())
          .pipe(catchError(super.serviceError));
      }

    registerUser(user: UserData): Observable<UserData> {
        let response = this.http.post(this.UrlServiceV1 + 'user', user, this.GetHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));

        return response;
    }

    login(user: AuthUser): Observable<AuthUser> {
        let response = this.http.post(this.UrlServiceV1 + 'user/auth', user, this.GetHeaderJson())
        .pipe(
            map(this.extractDataAuth),
            catchError(this.serviceError));

        return response;
    }

    getUserRole(userName: UserNameData): Observable<UserData> {
        let response = this.http.post(this.UrlServiceV1 + 'user/username', userName, this.GetHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
        return response;
    }

    getAllRoles(){
        let response = this.http.get<string[]>(this.UrlServiceV1 + 'role')
        .pipe(
            map(this.extractData),
            catchError(this.serviceError));
        return response;
    }

    findUserById(id: string): Observable<UserDataDetailsOutput> {
        return this.http
          .get<UserDataDetailsOutput>(`${this.UrlServiceV1}user/${id}`, super.GetHeaderJson())
          .pipe(catchError(super.serviceError));
    }

    updatePassword(changePassword: ChangePassword, userDataDetailsOutput: UserDataDetailsOutput): Observable<void> {
        return this.http
          .put<void>(`${this.UrlServiceV1}user/change-password/${userDataDetailsOutput.id}`, changePassword, super.GetHeaderJson())
          .pipe(
            catchError(super.serviceError));
    }
 }