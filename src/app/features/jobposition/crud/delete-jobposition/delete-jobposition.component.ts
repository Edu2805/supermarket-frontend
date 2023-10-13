import { Component } from '@angular/core';
import { JobPosition } from '../../model/jobposition';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { JobPositionService } from '../../services/jobposition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-jobposition',
  templateUrl: './delete-jobposition.component.html',
  styleUrls: ['./delete-jobposition.component.scss']
})
export class DeleteJobpositionComponent {

  jobPosition: JobPosition;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private jobPositionService: JobPositionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.jobPosition = this.route.snapshot.data['jobposition'];
      this.spinner.hide();
  }

  deleteJobPosition() {
    this.spinner.show();
    this.jobPositionService.deleteJobPosition(this.jobPosition.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_JOB_POSITION_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/jobposition/getAll']);
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
