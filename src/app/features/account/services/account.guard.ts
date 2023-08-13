import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { RegisterComponent } from "../register/register.component";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorage = new LocalStorageUtils();

    constructor(private translateService: TranslateService, 
        private router: Router){}

    canDeactivate(component: RegisterComponent) {
        if(component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_CONFIRM_UNSAVE_CHANGES'))
        }
        return true;
    }

    canActivate() {
        return true;
    }

}