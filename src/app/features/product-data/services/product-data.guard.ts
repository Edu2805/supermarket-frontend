import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CreateProductDataComponent } from "../crud/create-product-data/create-product-data.component";

@Injectable()
export class ProductDataGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateProductDataComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateProductDataComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}