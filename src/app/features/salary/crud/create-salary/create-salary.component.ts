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
import { OtherDiscount } from 'src/app/features/other-discount/model/other-discount';

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
    otherAdditions: [],
    otherDiscounts: []
  };
  localStorageUtils = new LocalStorageUtils();
  vaidateDocument: any;
  formResult: string= '';
  editingIndex: number = - 1;
  netSalaryValue: number = 0;
  exceededMaximumDiscount: boolean = false;
  actionType: any;
  
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
      otherAdditions: this.fb.array([]),
      otherDiscounts: this.fb.array([])
    });

    this.salaryForm.valueChanges.subscribe(() => {
      this.calculateNetSalary();
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
    if (this.salaryForm.dirty && this.salaryForm.valid) {
      this.spinner.show();
      this.salary = Object.assign({}, this.salary, this.salaryForm.value);
      this.salary.competenceStart = this.convertDate(this.salaryForm.get('competenceStart').value);
      this.salary.finalCompetence = this.convertDate(this.salaryForm.get('finalCompetence').value);
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

  onFormOtherDiscountSubmitted(otherDiscount: OtherDiscount) {
    if (otherDiscount.actionType === Constants.ACTION_INSERT) {
      this.salary.otherDiscounts.push(otherDiscount);
      this.setOtherDiscountsFormArrayInsert();
    } else {
      this.setOtherDiscountsFormArrayUpdate(otherDiscount);
    }
  }

  getOtherDiscountsFormArray(): FormArray {
    return this.salaryForm.get('otherDiscounts') as FormArray;
  }

  setOtherDiscountsFormArrayInsert() {
    const otherDiscountsArray = this.salaryForm.get('otherDiscounts') as FormArray;
    for (let i = this.salary.otherDiscounts.length - 1; i >= 0; i--) {
      const formArray = this.fb.group({
        discountName: this.salary.otherDiscounts[i].discountName,
        discountValue: this.salary.otherDiscounts[i].discountValue,
      });
      otherDiscountsArray.push(formArray);
      break;
    }
  }

  setOtherDiscountsFormArrayUpdate(otherDiscount: OtherDiscount) {
    const otherDiscountsArray = this.salaryForm.get('otherDiscounts') as FormArray;
    for (let i = otherDiscountsArray.length - 1; i >= 0; i--) {
      if (otherDiscount.index === i) {
        otherDiscountsArray.at(i).get('discountName').setValue(otherDiscount.discountName);
        otherDiscountsArray.at(i).get('discountValue').setValue(otherDiscount.discountValue);
        this.salary.otherDiscounts[i].discountName = otherDiscount.discountName;
        this.salary.otherDiscounts[i].discountValue = otherDiscount.discountValue;
      }
    }
  }

  editOtherDiscount(index: number) {
    const otherDiscountsArray = this.salaryForm.get('otherDiscounts') as FormArray;
    otherDiscountsArray.at(index).get('discountName').setValue(this.salary.otherDiscounts[index].discountName);
    otherDiscountsArray.at(index).get('discountValue').setValue(this.salary.otherDiscounts[index].discountValue);
    this.sharedDataService.setOtherDiscountData(this.salary.otherDiscounts[index], Constants.ACTION_UPDATE, index);
    this.actionType = Constants.ACTION_UPDATE;
  }

  deleteOtherDiscount(index: number) {
    this.salary.otherDiscounts.splice(index, 1);
    const otherDiscountsArray = this.salaryForm.get('otherDiscounts') as FormArray;
    otherDiscountsArray.removeAt(index);
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

  calculateNetSalary() {
    const grossSalary = this.salaryForm.get('grossSalary').value || 0;
    const otherDiscounts = this.salaryForm.get('otherDiscounts').value || [];
    const otherAdditions = this.salaryForm.get('otherAdditions').value || [];
    let netSalary = grossSalary;
    this.exceededMaximumDiscount = false;
    let maximumDiscount = 0;

    for (const discount of otherDiscounts) {
      netSalary -= discount.discountValue || 0;
      maximumDiscount = grossSalary * 0.7;

      if(maximumDiscount > netSalary && this.actionType !== Constants.ACTION_UPDATE) {
        this.exceededMaximumDiscount = true;
      }
    }
    this.actionType = Constants.ACTION_INSERT;

    if (this.exceededMaximumDiscount) {
      this.toastr.warning( 
        "O desconto máximo em folha não pode ultrapassar os 70% do salário bruto, realize o ajuste dos descontos.",
        "Atenção"
      );
    }

    for (const addition of otherAdditions) {
      netSalary += addition.additionValue || 0;
    }
    this.netSalaryValue = netSalary;
  }

  convertDate(date: string): string {
    const day = date.substr(0, 2);
    const month = date.substr(2, 2);
    const year = date.substr(4, 4);
    return `${year}-${month}-${day}`;
  }

}