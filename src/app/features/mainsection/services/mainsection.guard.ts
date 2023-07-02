import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CreateMainsectionComponent } from "../crud/create-mainsection/create-mainsection.component";

@Injectable()
export class MainSectionGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateMainsectionComponent> {


    constructor(protected override router: Router,
        private translateService: TranslateService) { super(router); }

    canDeactivate(component: CreateMainsectionComponent) {
        if (component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_MSG_ABANDON_FILLING_FORM'));
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}