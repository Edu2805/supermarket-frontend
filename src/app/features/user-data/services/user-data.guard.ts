import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BaseGuard } from "src/app/services/base.guard";
import { ApproveUserComponent } from "../approve/approve-user/approve-user.component";

@Injectable()
export class UserDataGuardService extends BaseGuard implements CanActivate, CanDeactivate<ApproveUserComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: ApproveUserComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}