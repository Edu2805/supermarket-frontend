import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { FinancialStatementReportsService } from '../../services/financial-statement-reports.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { InputReportsDate } from '../../model/Input-reports-date';
import { HistoricalPurchaseReportsOutput } from '../../model/historical-purchase-reports-output';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ReportGeneratorUtils } from 'src/app/utils/report-generator-utils';
import { GoodsissueService } from 'src/app/features/goodsissue/services/goodsissue.service';

@Component({
  selector: 'app-historical-purchases-reports',
  templateUrl: './historical-purchases-reports.component.html',
  styleUrls: ['./historical-purchases-reports.component.scss']
})
export class HistoricalPurchasesReportsComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  historicalPurchaseReportsForm: FormGroup;
  historicalPurchaseReports: HistoricalPurchaseReportsOutput[];
  localStorageUtils = new LocalStorageUtils();
  establismentName: string;

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private historicalPurchaseReportsFormBuilder: FormBuilder,
    private financialReportsService: FinancialStatementReportsService,
    private goodsIssueService: GoodsissueService) {

      super(toastr, translateService)

      this.validationMessages = {
        from: {
          required: this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_FROM_REQUIRED_MESSAGE'),
        },
        to: {
          required: this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TO_REQUIRED_MESSAGE'),
        }
      };
      super.messageConfigValidatorBase(this.validationMessages);
    }

  ngOnInit(): void {
    this.historicalPurchaseReportsForm = this.historicalPurchaseReportsFormBuilder.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.historicalPurchaseReportsForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.historicalPurchaseReportsForm);
  }

  generateReport() {
    if (this.historicalPurchaseReportsForm.dirty && this.historicalPurchaseReportsForm.valid) {
      this.spinner.show();
      const filters: InputReportsDate = this.historicalPurchaseReportsForm.value;

      this.getEstablishmentName();
      this.financialReportsService.getHistoricalPurchaseReport(filters)
      .subscribe(
        success => { this.processSuccess(success) },
        fail => { this.processFail(fail) }
      );
    }
  }

  processSuccess(response: any) {
    this.historicalPurchaseReports = response;
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

  getEstablishmentName() {
    this.goodsIssueService.getSaleInformation(this.localStorageUtils.getUser().login).subscribe(res => {
      this.establismentName = res.establismentName;
    });
  }

  exportPDF() {
    const name = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_PRODUCT_NAME');
    const code = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_PRODUCT_CODE');
    const inventory = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_PRODUCT_INVENTORY');
    const providerProductName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_PROVIDER_PRODUCT_NAME');
    const departmentName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_DEPARTMENT_NAME');
    const mainsectionName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_MAIN_SECTION_NAME');
    const subsectionName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_SUB_SECTION_NAME');
    const invoiceNumber = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_INVOICE');
    const totalInvoice = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_INVOICE_TOTAL');
    const registrationDate = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_DATE_RECEIPT');
    const received = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES_IS_RECEIVED');
    
    const columnNames = [
      name, code, inventory, providerProductName, departmentName,
      mainsectionName, subsectionName, invoiceNumber,
      totalInvoice, registrationDate, received
    ];

    const data = this.historicalPurchaseReports.map(item => [
      item.name, item.productCode, item.inventory, item.providerProductName,
      item.departmentName, item.mainsectionName, item.subsectionName,
      item.invoiceNumber, item.totalInvoice, new Date(item.registrationDate).toLocaleDateString('pt-BR'),
      item.received ? this.translateService.instant('br_com_supermarket_MSG_GENERIC_YES') : 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_NO')
    ]);
  
    ReportGeneratorUtils.exportPDF(data, 
      this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES'), 
      columnNames, this.establismentName, this.localStorageUtils.getUser().login
    );
  }

  exportExcel() {
    ReportGeneratorUtils.exportExcel(this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_PURCHASES'), 
      this.historicalPurchaseReports);
  }
}
