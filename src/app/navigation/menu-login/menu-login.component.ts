import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { AccountService } from 'src/app/features/account/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent implements OnInit {

  errors: any[] = [];
  token: string = "";
  user: any;
  login: any;
  userName: string = "";
  localStorageUtils = new LocalStorageUtils();
  userId: string = '';

  constructor(private router: Router, 
    private accountService: AccountService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {  }

  ngOnInit(): void {
    this.accountService.getUserRole({ 
        userName: this.localStorageUtils.getUser().login 
    }).subscribe(
        success => { this.processSuccess(success) },
        fail => { this.processFail(fail) }
    )
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

  processSuccess(response: any) {
    this.errors = [];
    this.spinner.hide();
    if (response) {
        this.userId = response.id;
    }
  }

  processFail(fail: any) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.errors;
    } else {
      if (fail.status === 403) {
        this.errors = [this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_EXPIRED_LOGIN')];
        this.localStorageUtils.clearUserLocationData();
        this.router.navigate(['/account/login']);
      } else {
        this.errors = fail.message;
      }
    }
    this.toastr.error(this.errors.toString(), this.translateService.instant('br_com_supermarket_MSG_ERROR'));
    this.spinner.hide();
  }
}