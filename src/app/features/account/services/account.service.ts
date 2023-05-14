import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserData } from "../models/user-data";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { BaseService } from "src/app/services/base.service";
import { AuthUser } from "../models/auth-user";
import { TranslateService } from "@ngx-translate/core";
import { UserNameData } from "../models/username-data";

@Injectable()
export class AccountService extends BaseService { 

    constructor(private http: HttpClient, translateService: TranslateService) { 
        super(translateService);
        this.translateService = this.translateService;
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
 }