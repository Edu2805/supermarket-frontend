import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { FinancialStatementReportsService } from '../../services/financial-statement-reports.service';
import { Observable, fromEvent, merge, switchMap } from 'rxjs';
import { InputReportsDate } from '../../model/Input-reports-date';
import { GoodsissueService } from 'src/app/features/goodsissue/services/goodsissue.service';
import { ReportGeneratorUtils } from 'src/app/utils/report-generator-utils';
import { FinancialDreReport } from '../../model/financial-dre-report';

@Component({
  selector: 'app-results-reports',
  templateUrl: './results-reports.component.html',
  styleUrls: ['./results-reports.component.scss']
})
export class ResultsReportsComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  resultsReportsForm: FormGroup;
  financialDreReport: FinancialDreReport;
  financialDreReportList: FinancialDreReport[] = [];
  localStorageUtils = new LocalStorageUtils();
  establismentName: string;
  isResultAppear: boolean = false;

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private resultsReportsFormBuilder: FormBuilder,
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
    this.resultsReportsForm = this.resultsReportsFormBuilder.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.resultsReportsForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.resultsReportsForm);
  }

  generateReport() {
    if (this.resultsReportsForm.dirty && this.resultsReportsForm.valid) {
      this.spinner.show();
      const filters: InputReportsDate = this.resultsReportsForm.value;
  
      this.getEstablishmentName();
      this.financialReportsService.getExpensiesDreReport(filters)
        .pipe(
          switchMap((response) => {
            this.calculateDre(response);
            return this.financialReportsService.getSalesDreReport(filters);
          })
        )
        .subscribe(
          totalRevenues => {
            this.calculateDre({ ...this.financialDreReport, totalRevenues: totalRevenues.totalRevenues });
            this.processSuccess();
          },
          fail => { this.processFail(fail); }
        );
    }
  }

  processSuccess() {
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

  calculateDre(input: any) {
    this.financialDreReport = input;
    this.financialDreReport.periodResult = input.totalRevenues - input.financialExpensesResult;

    this.showResults(this.financialDreReport);
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

  showResults(report: any) {
    if(report.totalRevenues == null || report.totalRevenues == undefined 
      || report.directExpensesResult == null || report.directExpensesResult == undefined 
      || report.indirectExpensesResult == null || report.indirectExpensesResult == undefined
      || report.taxesResult == null || report.taxesResult == undefined 
      || report.financialExpensesResult == null || report.financialExpensesResult == undefined
      || report.periodResult == null || report.periodResult == undefined) {

      this.isResultAppear = false;
    } else {
      this.isResultAppear = true;
    }
  }

  getEstablishmentName() {
    this.goodsIssueService.getSaleInformation(this.localStorageUtils.getUser().login).subscribe(res => {
      this.establismentName = res.establismentName;
    });
  }

  exportPDF() {
    const description = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_DESCRIPTION');
    const amount = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_AMOUNT');
    
    const columnNames = [description, amount];

    const dateFrom = new Date(this.resultsReportsForm.value.from);
    const adjustedDateFrom = new Date(dateFrom.getTime() + dateFrom.getTimezoneOffset() * 60000);
    const formattedDateFrom = adjustedDateFrom.toLocaleDateString('pt-BR');

    const dateTo = new Date(this.resultsReportsForm.value.to);
    const adjustedDateTo = new Date(dateTo.getTime() + dateTo.getTimezoneOffset() * 60000);
    const formattedDateTo = adjustedDateTo.toLocaleDateString('pt-BR');

    const totalRevenues = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TOTAL_REVENUES');
    const directExpensesResult = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TOTAL_DIRECT_EXPENSIES');
    const indirectExpensesResult = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TOTAL_INDIRECT_EXPENSIES');
    const taxesResult = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TOTAL_TAXES');
    const financialExpensesResult = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_TOTAL_EXPENSIES_RESULT');
    const periodResult = this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_PERIOD_RESULT');
    
    let data = [
      [totalRevenues, this.financialDreReport.totalRevenues],
      [directExpensesResult, this.financialDreReport.directExpensesResult],
      [indirectExpensesResult, this.financialDreReport.indirectExpensesResult],
      [taxesResult, this.financialDreReport.taxesResult],
      [financialExpensesResult, this.financialDreReport.financialExpensesResult],
      [periodResult, this.financialDreReport.periodResult < 0 ? 
        `(${Math.abs(this.financialDreReport.periodResult).toFixed(2)})` : this.financialDreReport.periodResult.toFixed(2)
      ]
    ];

    const establishmentNameAndPeriod = `${this.establismentName} - ${formattedDateFrom} - ${formattedDateTo}`;
  
    ReportGeneratorUtils.exportPDF(data, 
      this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_DRE'), 
      columnNames, establishmentNameAndPeriod, this.localStorageUtils.getUser().login
    );

    data = [];
  }

  exportExcel() {
    this.financialDreReportList.push(this.financialDreReport);
    ReportGeneratorUtils.exportExcel(this.translateService.instant('br_com_supermarket_FINANCIAL_STATEMENT_REPORTS_DRE'), 
      this.financialDreReportList);

    this.financialDreReportList = [];
  }
}
