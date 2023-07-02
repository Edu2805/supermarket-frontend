import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Department } from '../../model/department';
import { DepartmentService } from '../../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { Establishment } from 'src/app/features/establishment/model/establishment';
import { EstablishmentService } from 'src/app/features/establishment/services/establishment.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  departmentForm: FormGroup;
  department: Department;
  establishments: Establishment[];
  localStorageUtils = new LocalStorageUtils();

  vaidateDocument: any;

  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private departmentService: DepartmentService,
    private establishmentService: EstablishmentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

    super();
    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_NAME_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE'),
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_ESTABLISHMENT_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);

    this.department = this.route.snapshot.data['department'];
  }

  ngOnInit() {
    this.getEstablishments();
    this.spinner.show();
    this.departmentForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      establishment: this.fb.group({
        id: ['', Validators.required]
      })
    });
    this.fillForm();
  }

  fillForm() {
    this.departmentForm.patchValue({
      id: this.department?.id,
      name: this.department?.name,
      establishment: {
        id: this.department?.establishment.id
      }
    });
    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.departmentForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.departmentForm);
  }

  getEstablishments() {
    this.establishmentService.getAllEstablishments().subscribe((response) => {
      this.establishments = response['content'];
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_DEPARTMENT_AN_ERROR_OCCURRED_WHILE_GET_ESTABLISHMENTS'));
    });
  }

  editDepartment() {
    if (this.departmentForm.dirty && this.departmentForm.valid) {
      this.spinner.show();
      this.department = Object.assign({}, this.department, this.departmentForm.value);

      this.departmentService.updateDepartment(this.department)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.departmentForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_DEPARTMENT_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/department/getAll'])
      });
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
