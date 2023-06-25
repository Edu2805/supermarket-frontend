import { Component } from '@angular/core';
import { Department } from '../../model/department';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.scss']
})
export class DeleteDepartmentComponent {
  
  department: Department;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.department = this.route.snapshot.data['department'];
      this.spinner.hide();
  }

  deleteDepartment() {
    this.spinner.show();
    this.departmentService.deleteDepartment(this.department.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_DEPARTMENT_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/department/getAll']);
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
