import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CreateDepartmentComponent } from "../crud/create/create-department.component";

@Injectable()
export class DepartmentGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateDepartmentComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateDepartmentComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}