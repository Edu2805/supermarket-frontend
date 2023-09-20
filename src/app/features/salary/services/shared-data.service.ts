import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private otherAdditionData = new BehaviorSubject<any>(null);
  otherAdditionData$ = this.otherAdditionData.asObservable();
  actionType: any;
  index: any;

  setOtherAdditionData(data: any, action: any, index?: any) {
    this.actionType = action;
    this.index = index;
    this.otherAdditionData.next(data);
  }
}
