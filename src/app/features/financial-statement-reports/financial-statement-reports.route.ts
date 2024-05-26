import { RouterModule, Routes } from "@angular/router";
import { FinancialStatementReportsComponent } from "./financial-statement-reports.component";
import { PurchasesReportsComponent } from "./reports/purchases-reports/purchases-reports.component";
import { SalesReportsComponent } from "./reports/sales-reports/sales-reports.component";
import { FinancialStatementReportsGuardService } from "./services/financial-statement-reports.guard";
import { NgModule } from "@angular/core";
import { FinancialStatementHomeComponent } from "./reports/financial-statement-home/financial-statement-home.component";
import { HistoricalReportsComponent } from "./reports/historical-reports-home/historical-reports.component";
import { ResultsReportsComponent } from "./reports/results-reports/results-reports.component";
import { HistoricalSalesReportsComponent } from "./reports/historical-sales-reports/historical-sales-reports.component";
import { HistoricalPurchasesReportsComponent } from "./reports/historical-purchases-reports/historical-purchases-reports.component";

const FinancialStatementReportsRouterConfig: Routes = [
    {
        path: '', component: FinancialStatementReportsComponent,
        children: [
            { 
                path: 'home', component: FinancialStatementHomeComponent,
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
            { 
                path: 'sales-reports', component: SalesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
            { 
                path: 'purchases-reports', component: PurchasesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
            { 
                path: 'historical-reports', component: HistoricalReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
            { 
                path: 'result-reports', component: ResultsReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE']
                } 
            },
            { 
                path: 'historical-sale-reports', component: HistoricalSalesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
            { 
                path: 'historical-purchase-reports', component: HistoricalPurchasesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'RECEIPT']
                } 
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(FinancialStatementReportsRouterConfig)
    ],
    exports: [RouterModule]
})
export class FinancialStatementReportsRoute{}