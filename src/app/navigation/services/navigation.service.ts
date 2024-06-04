import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private userIdSource = new BehaviorSubject<string | null>(null);
  currentUserId = this.userIdSource.asObservable();

  constructor() { }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }
}
