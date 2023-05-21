import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    public LocalStorage = new LocalStorageUtils();
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.LocalStorage.getUserToken()}`
        }
        });
        return next.handle(request);
    }
}