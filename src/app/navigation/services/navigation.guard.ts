import { Injectable } from "@angular/core";
import { BaseGuard } from "src/app/services/base.guard";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";

@Injectable()
export class NavigationGuard extends BaseGuard implements CanActivate {


    constructor(protected override router: Router) { 
        super(router); 
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}
