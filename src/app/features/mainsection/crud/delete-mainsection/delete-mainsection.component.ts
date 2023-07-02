import { Component } from '@angular/core';
import { MainSection } from '../../model/mainsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { MainsectionService } from '../../services/mainsection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-mainsection',
  templateUrl: './delete-mainsection.component.html',
  styleUrls: ['./delete-mainsection.component.scss']
})
export class DeleteMainsectionComponent {

  mainsection: MainSection;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private mainsectionService: MainsectionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.mainsection = this.route.snapshot.data['mainsection'];
      this.spinner.hide();
  }

  deleteMainsection() {
    this.spinner.show();
    this.mainsectionService.deleteMainsection(this.mainsection.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_MAIN_SECTION_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/main-section/getAll']);
        this.spinner.hide()
      });
    }
  }

  failDelete(fail) {
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
