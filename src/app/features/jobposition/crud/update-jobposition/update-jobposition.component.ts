import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { JobPosition } from '../../model/jobposition';
import { Salary } from 'src/app/features/salary/model/salary';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { SalaryService } from 'src/app/features/salary/services/salary.service';
import { JobPositionService } from '../../services/jobposition.service';

@Component({
  selector: 'app-update-jobposition',
  templateUrl: './update-jobposition.component.html',
  styleUrls: ['./update-jobposition.component.scss']
})
export class UpdateJobpositionComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  jobpositionForm: FormGroup;
  jobposition: JobPosition;
  salaries: Salary[];
  localStorageUtils = new LocalStorageUtils();
  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private jobpositionService: JobPositionService,
    private salaryService: SalaryService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);

    this.validationMessages = {
      assignments: {
        required: this.translateService.instant('br_com_supermarket_JOB_POSITION_ERROR_FORM_ASSIGNMENTS_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_JOB_POSITION_ERROR_FORM_ASSIGNMENTS_LENGTH_MESSAGE'),
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_JOB_POSITION_ERROR_FORM_SALARY_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);

    this.jobposition = this.route.snapshot.data['jobposition'];
  }

  ngOnInit() {
    this.getSalaries();
    this.jobpositionForm = this.fb.group({
      assignments: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 100])])],
      salary: this.fb.group({
        id: ['', Validators.required]
      })
    });
    this.fillForm();
  }

  fillForm() {
    this.jobpositionForm.patchValue({
      id: this.jobposition?.id,
      assignments: this.jobposition?.assignments,
      salary: {
        id: this.jobposition?.salary.id
      }
    });
    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.jobpositionForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.jobpositionForm);
  }

  getSalaries() {
    this.salaryService.getAllSalary().subscribe((response) => {
      this.salaries = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_JOB_POSITION_AN_ERROR_OCCURRED_WHILE_GET_SALARIES'));
    });
  }

  updateJobPosition() {
    
    if (this.jobpositionForm.dirty && this.jobpositionForm.valid) {
      this.spinner.show();
      this.jobposition = Object.assign({}, this.jobposition, this.jobpositionForm.value);
      this.jobpositionService.updateJobPosition(this.jobposition)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.jobpositionForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_JOB_POSITION_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/jobposition/getAll'])
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
