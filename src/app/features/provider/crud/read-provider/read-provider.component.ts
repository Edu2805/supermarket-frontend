import { Component, OnInit } from '@angular/core';
import { Provider } from '../../model/provider';
import { Page } from 'src/app/utils/pagination/model/models';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProviderService } from '../../services/provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-provider',
  templateUrl: './read-provider.component.html',
  styleUrls: ['./read-provider.component.scss']
})
export class ReadProviderComponent implements OnInit {

  public providers: Array<Provider> = [];
  public page: Page<Provider>;
  PAGE = 0;
  SIZE = 10;
  errorMessage: string;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(private providerService: ProviderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getAllPaged(this.PAGE, this.SIZE);
  }

  getAllPaged(page, size) {
    this.spinner.show();
    this.providerService.getAllProvidersPaged(page, size)
    .subscribe(
      provider => {
        this.page = provider;
        this.providers = this.page['content'];
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

