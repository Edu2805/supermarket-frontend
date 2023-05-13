import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";
import { TranslateService } from "@ngx-translate/core";

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = "/api/";

    constructor(protected translateService: TranslateService) {}

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractDataUser(response: any) {
        return response || {};
    }

    protected extractDataAuth(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push(this.translateService.instant('br_com_supermarket_MSG_UNKNOWN_ERROR'));
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}