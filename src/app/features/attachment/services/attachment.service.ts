import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends BaseService {

  attatchment: Attachment;

  constructor(private http: HttpClient) {
    super();
  }

  // uploadAttachment(image: String): Observable<String> {
  //   return this.http
  //     .post(`${this.UrlServiceV1}attachment`, image, this.GetHeaderJson())
  //     .pipe(
  //       map(super.extractDataAuth),
  //       catchError(super.serviceError));
  // }

  getAttachmentById(id: string): Observable<String> {
    return this.http
      .get<String>(`${this.UrlServiceV1}attachment/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
