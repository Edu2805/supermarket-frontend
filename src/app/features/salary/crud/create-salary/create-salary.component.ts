import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Salary } from '../../model/salary';
import { SalaryService } from '../../services/salary.service';
import { DateValidationForm } from 'src/app/utils/date-validation-form';
import { CustomValidators } from 'ngx-custom-validators';
import { OtherAddition } from 'src/app/features/other-addition/model/other-addition';
import { SharedDataService } from '../../services/shared-data.service';
import { Constants } from 'src/app/utils/constants/constants';

@Component({
  selector: 'app-create-salary',
  templateUrl: './create-salary.component.html',
  styleUrls: ['./create-salary.component.scss']
})
export class CreateSalaryComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  salaryForm: FormGroup;
  salary: Salary = {
    position: '',
    salaryRange: '',
    grossSalary: 0,
    salaryAdvance: 0,
    benefits: '',
    competenceStart: '',
    finalCompetence: '',
    otherAdditions: []
  };
  localStorageUtils = new LocalStorageUtils();
  vaidateDocument: any;
  formResult: string= '';
  editingIndex: number = - 1;
  editValues: any;
  
  constructor(private fb: FormBuilder,
    private salaryService: SalaryService,
    private router: Router,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private sharedDataService: SharedDataService,
    private spinner: NgxSpinnerService) {

    super(toastr, translateService);
    this.validationMessages = {
      position: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_POSITION_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_POSITION_MIN_MAX_LENGTH_MESSAGE'),
      },
      salaryRange: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_SALARY_RANGE_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_SALARY_RANGE_MIN_MAX_LENGTH_MESSAGE'),
      },
      grossSalary: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_GROSS_SALARY_REQUIRED_MESSAGE'),
      },
      benefits: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_BENEFITS_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_BENEFITS_MIN_MAX_LENGTH_MESSAGE'),
      },
      competenceStart: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_COMPETENCE_START_REQUIRED_MESSAGE'),
        invalidDate: this.translateService.instant('br_com_supermarket_SALARY_INVALID_DATE'),
      },
      finalCompetence: {
        required: this.translateService.instant('br_com_supermarket_SALARY_ERROR_FORM_FINAL_COMPETENCE_REQUIRED_MESSAGE'),
        invalidDate: this.translateService.instant('br_com_supermarket_SALARY_INVALID_DATE'),
      },
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.salaryForm = this.fb.group({
      position: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 30])])],
      salaryRange: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 10])])],
      grossSalary: [null , Validators.required],
      salaryAdvance: [null],
      benefits: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 100])])],
      competenceStart: ['', Validators.compose([Validators.required, DateValidationForm.date])],
      finalCompetence: ['', Validators.compose([Validators.required, DateValidationForm.date])],
      otherDiscounts: this.fb.group({
        id: ['']
      }),
      otherAdditions: this.fb.array([])
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.salaryForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.salaryForm);
  }

  addSalary() {
    console.log(this.salary.otherAdditions);
    if (this.salaryForm.dirty && this.salaryForm.valid) {
      this.spinner.show();
      this.salary = Object.assign({}, this.salary, this.salaryForm.value);
      console.log(this.salary.otherAdditions);
      this.salaryService.newSalary(this.salary)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  onFormOtherAdditionSubmitted(otherAddition: OtherAddition) {
    if (otherAddition.actionType === Constants.ACTION_INSERT) {
      this.salary.otherAdditions.push(otherAddition);
      this.setOtherAdditionsFormArrayInsert();
    } else {
      this.setOtherAdditionsFormArrayUpdate(otherAddition);
    }
  }

  getOtherAdditionsFormArray(): FormArray {
    return this.salaryForm.get('otherAdditions') as FormArray;
  }

  setOtherAdditionsFormArrayInsert() {
    const otherAdditionsArray = this.salaryForm.get('otherAdditions') as FormArray;
    for (let i = this.salary.otherAdditions.length - 1; i >= 0; i--) {
      const formArray = this.fb.group({
        additionName: this.salary.otherAdditions[i].additionName,
        additionValue: this.salary.otherAdditions[i].additionValue,
      });
      otherAdditionsArray.push(formArray);
      break;
    }
  }

  setOtherAdditionsFormArrayUpdate(otherAddition: OtherAddition) {
    const otherAdditionsArray = this.salaryForm.get('otherAdditions') as FormArray;
    for (let i = otherAdditionsArray.length - 1; i >= 0; i--) {
      if (otherAddition.index === i) {
        otherAdditionsArray.at(i).get('additionName').setValue(otherAddition.additionName);
        otherAdditionsArray.at(i).get('additionValue').setValue(otherAddition.additionValue);
        this.salary.otherAdditions[i].additionName = otherAddition.additionName;
        this.salary.otherAdditions[i].additionValue = otherAddition.additionValue;
      }
    }
  }

  editOtherAddition(index: number) {
    const otherAdditionsArray = this.salaryForm.get('otherAdditions') as FormArray;
    otherAdditionsArray.at(index).get('additionName').setValue(this.salary.otherAdditions[index].additionName);
    otherAdditionsArray.at(index).get('additionValue').setValue(this.salary.otherAdditions[index].additionValue);
    this.sharedDataService.setOtherAdditionData(this.salary.otherAdditions[index], Constants.ACTION_UPDATE, index);
  }

  deleteOtherAddition(index: number) {
    this.salary.otherAdditions.splice(index, 1);
    const otherAdditionsArray = this.salaryForm.get('otherAdditions') as FormArray;
    otherAdditionsArray.removeAt(index);
  }

  processSuccess(response: any) {
    this.salaryForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_SALARY_NEW_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/salary/getAll'])
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
