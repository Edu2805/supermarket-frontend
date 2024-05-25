import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { HistoricalSaleReportsOutput } from '../../model/historical-sales-reports-output';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FinancialStatementReportsService } from '../../services/financial-statement-reports.service';
import { GoodsissueService } from 'src/app/features/goodsissue/services/goodsissue.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { InputReportsDate } from '../../model/Input-reports-date';
import { ReportGeneratorUtils } from 'src/app/utils/report-generator-utils';

@Component({
  selector: 'app-historical-sales-reports',
  templateUrl: './historical-sales-reports.component.html',
  styleUrls: ['./historical-sales-reports.component.scss']
})
export class HistoricalSalesReportsComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  historicalSaleReportsForm: FormGroup;
  historicalSaleReports: HistoricalSaleReportsOutput[];
  localStorageUtils = new LocalStorageUtils();
  establismentName: string;

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private historicalSaleReportsFormBuilder: FormBuilder,
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
    this.historicalSaleReportsForm = this.historicalSaleReportsFormBuilder.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.historicalSaleReportsForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.historicalSaleReportsForm);
  }

  generateReport() {
    if (this.historicalSaleReportsForm.dirty && this.historicalSaleReportsForm.valid) {
      this.spinner.show();
      const filters: InputReportsDate = this.historicalSaleReportsForm.value;

      this.getEstablishmentName();
      this.financialReportsService.getHistoricalSaleReport(filters)
      .subscribe(
        success => { this.processSuccess(success) },
        fail => { this.processFail(fail) }
      );
    }
  }

  processSuccess(response: any) {
    this.historicalSaleReports = response;
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
    const name = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_NAME');
    const code = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_CODE');
    const ean13 = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_EAN13');
    const dun14 = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_DUN14');
    const salePrice = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_SALE_PRICE');
    const inventory = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCT_INVENTORY');
    const providerProductName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PROVIDER_PRODUCT_NAME');
    const departmentName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_DEPARTMENT_NAME');
    const mainsectionName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_MAIN_SECTION_NAME');
    const subsectionName = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_SUB_SECTION_NAME');
    const saleNumber = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_SALE_NUMBER');
    const productsTotal = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_PRODUCTS_TOTAL');
    const registrationDate = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_DATE_REGISTER');
    const effectiveSale = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES_IS_EFFECTIVE_SALE');
    
    const columnNames = [
      name, code, ean13, dun14, salePrice, inventory, providerProductName, departmentName,
      mainsectionName, subsectionName, saleNumber,
      productsTotal, registrationDate, effectiveSale
    ];

    const data = this.historicalSaleReports.map(item => [
      item.name, item.productCode, item.ean13, item.dun14, item.salePrice, item.inventory, item.providerProductName,
      item.departmentName, item.mainsectionName, item.subsectionName, item.saleNumber, item.productsTotal, 
      new Date(item.registrationDate).toLocaleDateString('pt-BR'),
      item.effectiveSale ? this.translateService.instant('br_com_supermarket_MSG_GENERIC_YES') : 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_NO')
    ]);
  
    ReportGeneratorUtils.exportPDF(data, 
      this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES'), 
      columnNames, this.establismentName, this.localStorageUtils.getUser().login
    );

    this.historicalSaleReports = [];
  }

  exportExcel() {
    ReportGeneratorUtils.exportExcel(this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_HISTORIC_SALES'), 
      this.historicalSaleReports);

    this.historicalSaleReports = [];
  }
}
