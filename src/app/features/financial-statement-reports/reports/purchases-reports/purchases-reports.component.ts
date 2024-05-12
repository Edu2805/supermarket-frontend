import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { FinancialStatementReportsService } from '../../services/financial-statement-reports.service';
import { FinancialPurchaseReport } from '../../model/financial-purchase-reports';
import { Observable, fromEvent, merge } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchases-reports',
  templateUrl: './purchases-reports.component.html',
  styleUrls: ['./purchases-reports.component.scss']
})
export class PurchasesReportsComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  purchaseReportsForm: FormGroup;
  reportData: any;
  financialResult: number;
  localStorageUtils = new LocalStorageUtils();

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private purchaseReportsFormBuilder: FormBuilder,
    private purchaseReportsService: FinancialStatementReportsService) {

      super(toastr, translateService)

      this.validationMessages = {
        from: {
          required: this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_FROM_REQUIRED_MESSAGE'),
        },
        to: {
          required: this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TO_REQUIRED_MESSAGE'),
        },
        isReceived: {
          required: this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_FIELD_REQUIRED_MESSAGE'),
        }
      };
      super.messageConfigValidatorBase(this.validationMessages);
    }

  ngOnInit() {
    this.purchaseReportsForm = this.purchaseReportsFormBuilder.group({
      providerProductName: [null],
      departmentName: [null],
      mainsectionName: [null],
      subsectionName: [null],
      productCode: [null],
      invoice: [null],
      from: [null, Validators.required],
      to: [null, Validators.required],
      isReceived: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.purchaseReportsForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.purchaseReportsForm);
  }

  generateReport() {
    if (this.purchaseReportsForm.dirty && this.purchaseReportsForm.valid) {
      this.spinner.show();
      const filters: FinancialPurchaseReport = this.purchaseReportsForm.value;

      this.purchaseReportsService.getPurchaseReport(filters)
      .subscribe(
        success => { this.processSuccess(success) },
        fail => { this.processFail(fail) }
      );
    }
  }

  processSuccess(response: any) {
    this.reportData = response;
    this.financialResult = response.result;

    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
      if (toast) {
        this.spinner.hide();
      }
  }

  processFail(fail: any) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.message;
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