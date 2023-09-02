import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BaseGuard } from "src/app/services/base.guard";
import { CreateSalaryComponent } from "../crud/create-salary/create-salary.component";

@Injectable()
export class SalaryGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateSalaryComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateSalaryComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}