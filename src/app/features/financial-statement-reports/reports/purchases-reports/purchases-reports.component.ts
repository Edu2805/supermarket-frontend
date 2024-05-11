import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { FinancialStatementReportsService } from '../../services/financial-statement-reports.service';
import { FinancialPurchaseReport } from '../../model/financial-purchase-reports';

@Component({
  selector: 'app-purchases-reports',
  templateUrl: './purchases-reports.component.html',
  styleUrls: ['./purchases-reports.component.scss']
})
export class PurchasesReportsComponent extends FormBaseComponent implements OnInit {

  reportForm: FormGroup;
  reportData: any;
  financialResult: number;

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private purchaseReportsFormBuilder: FormBuilder,
    private purchaseReportsService: FinancialStatementReportsService) {

      super(toastr, translateService)
    }

  ngOnInit() {
    this.reportForm = this.purchaseReportsFormBuilder.group({
      providerProductName: [null],
      departmentName: [null],
      mainsectionName: [null],
      subsectionName: [null],
      productCode: [null],
      invoice: [null],
      from: [null],
      to: [null],
      isReceived: [null]
    });
  }

  generateReport() {
    const filters: FinancialPurchaseReport = this.reportForm.value;

    this.purchaseReportsService.getPurchaseReport(filters).subscribe(
      (data) => {
        this.reportData = data;
        this.financialResult = data.result;
      },
      (error) => {
        console.error('Erro ao buscar relatório:', error);
      }
    );
  }
}

