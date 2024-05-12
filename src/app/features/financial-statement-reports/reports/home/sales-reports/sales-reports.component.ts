import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { FinancialSaleReport } from '../../../model/financial-sale-reports';
import { FinancialStatementReportsService } from '../../../services/financial-statement-reports.service';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent extends FormBaseComponent implements OnInit {

  reportForm: FormGroup;
  reportData: any;
  financialResult: number;

  constructor(
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private salesReportsFormBuilder: FormBuilder,
    private salesReportsService: FinancialStatementReportsService) {

      super(toastr, translateService)
    }

  ngOnInit() {
    this.reportForm = this.salesReportsFormBuilder.group({
      providerProductName: [null],
      departmentName: [null],
      mainsectionName: [null],
      subsectionName: [null],
      productCode: [null],
      ean13: [null],
      dun14: [null],
      saleNumber: [null],
      from: [null],
      to: [null],
      isEffectiveSale: [null]
    });
  }

  generateReport() {
    const filters: FinancialSaleReport = this.reportForm.value;

    this.salesReportsService.getSaleReport(filters).subscribe(
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
