import { Component } from '@angular/core';
import { SubSection } from '../../model/subsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { SubsectionService } from '../../services/subsection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-subsection',
  templateUrl: './delete-subsection.component.html',
  styleUrls: ['./delete-subsection.component.scss']
})
export class DeleteSubsectionComponent {

  subsection: SubSection;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private subsectionService: SubsectionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.subsection = this.route.snapshot.data['subsection'];
      this.spinner.hide();
  }

  deleteSubsection() {
    this.spinner.show();
    this.subsectionService.deleteSubsection(this.subsection.id)
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
        this.router.navigate(['/sub-section/getAll']);
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
