import { RouterModule, Routes } from "@angular/router";
import { FinancialStatementReportsComponent } from "./financial-statement-reports.component";
import { PurchasesReportsComponent } from "./reports/home/purchases-reports/purchases-reports.component";
import { SalesReportsComponent } from "./reports/home/sales-reports/sales-reports.component";
import { FinancialStatementReportsGuardService } from "./services/financial-statement-reports.guard";
import { NgModule } from "@angular/core";

const FinancialStatementReportsRouterConfig: Routes = [
    {
        path: '', component: FinancialStatementReportsComponent,
        children: [
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