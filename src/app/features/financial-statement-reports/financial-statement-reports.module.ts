import { registerLocaleData, CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { TranslateModule } from "@ngx-translate/core";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { FinancialStatementReportsComponent } from "./financial-statement-reports.component";
import ptBr from '@angular/common/locales/pt';
import { SalesReportsComponent } from './reports/sales-reports/sales-reports.component';
import { PurchasesReportsComponent } from './reports/purchases-reports/purchases-reports.component';
import { FinancialStatementReportsGuardService } from "./services/financial-statement-reports.guard";
import { FinancialStatementReportsService } from "./services/financial-statement-reports.service";
import { FinancialStatementReportsRoute } from "./financial-statement-reports.route";
import { FinancialStatementHomeComponent } from './reports/financial-statement-home/financial-statement-home.component';
import { ResultsReportsComponent } from './reports/results-reports/results-reports.component';
import { HistoricalReportsComponent } from './reports/historical-reports/historical-reports.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        FinancialStatementReportsComponent,
        SalesReportsComponent,
        PurchasesReportsComponent,
        FinancialStatementHomeComponent,
        ResultsReportsComponent,
        HistoricalReportsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        FinancialStatementReportsGuardService,
        FinancialStatementReportsService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        FinancialStatementReportsRoute,
    ],
    exports:[]
})
export class FinancialStatementReportsModule{}