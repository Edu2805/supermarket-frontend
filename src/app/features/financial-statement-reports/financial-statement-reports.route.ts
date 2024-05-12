import { RouterModule, Routes } from "@angular/router";
import { FinancialStatementReportsComponent } from "./financial-statement-reports.component";
import { PurchasesReportsComponent } from "./reports/purchases-reports/purchases-reports.component";
import { SalesReportsComponent } from "./reports/sales-reports/sales-reports.component";
import { FinancialStatementReportsGuardService } from "./services/financial-statement-reports.guard";
import { NgModule } from "@angular/core";
import { FinancialStatementHomeComponent } from "./reports/financial-statement-home/financial-statement-home.component";
import { HistoricalReportsComponent } from "./reports/historical-reports/historical-reports.component";
import { ResultsReportsComponent } from "./reports/results-reports/results-reports.component";

const FinancialStatementReportsRouterConfig: Routes = [
    {
        path: '', component: FinancialStatementReportsComponent,
        children: [
            { 
                path: 'home', component: FinancialStatementHomeComponent,
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            { 
                path: 'sales-reports', component: SalesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            { 
                path: 'purchases-reports', component: PurchasesReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            { 
                path: 'historical-reports', component: HistoricalReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            { 
                path: 'result-reports', component: ResultsReportsComponent,
                canDeactivate: [FinancialStatementReportsGuardService],
                canActivate: [FinancialStatementReportsGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
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