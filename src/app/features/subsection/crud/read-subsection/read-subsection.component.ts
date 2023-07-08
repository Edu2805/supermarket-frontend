import { Component, OnInit } from '@angular/core';
import { SubSection } from '../../model/subsection';
import { Page } from 'src/app/utils/pagination/model/models';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { SubsectionService } from '../../services/subsection.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-subsection',
  templateUrl: './read-subsection.component.html',
  styleUrls: ['./read-subsection.component.scss']
})
export class ReadSubsectionComponent implements OnInit {

  public subSections: Array<SubSection> = [];
  public page: Page<SubSection>;
  PAGE = 0;
  SIZE = 10;
  errorMessage: string;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(private subsectionService: SubsectionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getAllPaged(this.PAGE, this.SIZE);
  }

  getAllPaged(page, size) {
    this.spinner.show();
    this.subsectionService.getAllSubsectionsPaged(page, size)
    .subscribe(
      subsection => {
        this.page = subsection;
        this.subSections = this.page['content'];
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
