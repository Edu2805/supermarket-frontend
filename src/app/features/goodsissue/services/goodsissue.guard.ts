import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BaseGuard } from "src/app/services/base.guard";
import { CreateGoodsIssueComponent } from "../feature/create-goods-issue/create-goods-issue.component";

@Injectable()
export class GoodsIssueGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateGoodsIssueComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateGoodsIssueComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}