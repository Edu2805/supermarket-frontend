import { Component, OnInit } from '@angular/core';
import { MainSection } from '../../model/mainsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { MainsectionService } from '../../services/mainsection.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/utils/pagination/model/models';

@Component({
  selector: 'app-read-mainsection',
  templateUrl: './read-mainsection.component.html',
  styleUrls: ['./read-mainsection.component.scss']
})
export class ReadMainsectionComponent implements OnInit {

  public mainSections: Array<MainSection> = [];
  public page: Page<MainSection>;
  PAGE = 0;
  SIZE = 10;
  errorMessage: string;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(private mainsectionService: MainsectionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getAllPaged(this.PAGE, this.SIZE);
  }

  getAllPaged(page, size) {
    this.spinner.show();
    this.mainsectionService.getAllMainsectionsPaged(page, size)
    .subscribe(
      mainsection => {
        this.page = mainsection;
        this.mainSections = this.page['content'];
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

