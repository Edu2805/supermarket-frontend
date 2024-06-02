import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/app/features/account/services/account.service";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private localStorageUtils = new LocalStorageUtils();
    errors: any[] = [];
    userId: string = '';

    constructor(private accountService: AccountService,
        private translateService: TranslateService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router,
    ) {}

    ngOnInit(): void {
      this.spinner.show();
        this.accountService.getUserRole({ 
            userName: this.localStorageUtils.getUser().login 
        }).subscribe(
            success => { this.processSuccess(success) },
            fail => { this.processFail(fail) }
        )
    } 

    verifyUserAccess(...holes: string[]): boolean {
        let user = this.localStorageUtils.getUser();
        return holes.includes(user?.roleType);
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