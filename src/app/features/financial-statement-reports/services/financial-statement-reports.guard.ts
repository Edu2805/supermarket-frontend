import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, CanDeactivate } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { SalesReportsComponent } from "../reports/sales-reports/sales-reports.component";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class FinancialStatementReportsGuardService extends BaseGuard implements CanActivate, CanDeactivate<SalesReportsComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: SalesReportsComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}