import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = "/api/";

    constructor() {}

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }

    protected extractDataAuth(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("An unknown error has occurred.");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}