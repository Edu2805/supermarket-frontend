import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { RegisterComponent } from "../register/register.component";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorage = new LocalStorageUtils();

    constructor(private translateService: TranslateService, private router: Router) {}

    canDeactivate(component: RegisterComponent) {
        if(component.unsaveChanges) {
            return window.confirm(this.translateService.instant('br_com_supermarket_CONFIRM_UNSAVE_CHANGES'))
        }
        return true;
    }

    canActivate() {
        if (this.localStorage.getUserToken()) {
            this.router.navigate(['/home']);
        }
        return true;
    }

}