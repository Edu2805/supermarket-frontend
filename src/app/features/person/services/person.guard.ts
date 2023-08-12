import { Injectable } from "@angular/core";
import { CreatePersonComponent } from "../crud/create-person/create-person.component";
import { CanActivate, CanDeactivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BaseGuard } from "src/app/services/base.guard";

@Injectable()
export class PersonGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreatePersonComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreatePersonComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}