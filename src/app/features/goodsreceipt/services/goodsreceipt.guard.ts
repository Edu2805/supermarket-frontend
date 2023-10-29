import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { CreateGoodsreceiptComponent } from "../crud/create-goodsreceipt/create-goodsreceipt.component";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class GoodsReceiptGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateGoodsreceiptComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateGoodsreceiptComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}