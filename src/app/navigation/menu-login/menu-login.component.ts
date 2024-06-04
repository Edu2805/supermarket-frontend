import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent implements OnInit {

  token: string = "";
  user: any;
  login: any;
  userName: string = "";
  localStorageUtils = new LocalStorageUtils();
  userId: string = '';

  constructor(private router: Router, 
    private navigationService: NavigationService) {  }

  ngOnInit(): void {
      this.navigationService.currentUserId.subscribe(userId => this.userId = userId);
  } 

  loggedUser(): boolean {
    this.token = this.localStorageUtils.getUserToken();
    this.user = this.localStorageUtils.getUser();
    
    if (this.user && this.user.userName) {
      this.userName = this.user.userName;
    } else if (this.user && this.user.login){
      this.userName = this.user.login;
    }
      
    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.clearUserLocationData();
    this.router.navigate(['/account/login']);
  }
}