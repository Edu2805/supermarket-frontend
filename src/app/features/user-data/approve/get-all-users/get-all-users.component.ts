import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../../services/user-data.service';
import { UserDataDetailsOutput } from 'src/app/features/account/models/user-data-details-output';
import { Page } from 'src/app/utils/pagination/model/models';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ApproveUserDataOutput } from '../../model/approve-user-output';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.scss']
})
export class GetAllUsersComponent implements OnInit {

  public usersDataDetailsOutput: Array<ApproveUserDataOutput> = [];
  public page: Page<ApproveUserDataOutput>;
  PAGE = 0;
  SIZE = 10;
  errorMessage: string;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(private userDataService: UserDataService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getAllPaged(this.PAGE, this.SIZE);
  }

  getAllPaged(page, size) {
    this.spinner.show();
    this.userDataService.getAllUsersDataPaged(page, size)
    .subscribe(
      subsection => {
        this.page = subsection;
        this.usersDataDetailsOutput = this.page['content'];
        this.spinner.hide();
      },
      fail => { 
        this.processFail(fail) 
      }
    );
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

  changePage(event){
    this.getAllPaged(event.page, event.size);
   }
}
