import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/services/base.guard";
import { CreateEstablishmentComponent } from "../crud/create/create-establishment/create-establishment.component";
import { Injectable } from "@angular/core";

@Injectable()
export class EstablishmentGuardService extends BaseGuard implements CanActivate, CanDeactivate<CreateEstablishmentComponent> {


    constructor(protected override router: Router) { super(router); }

    canDeactivate(component: CreateEstablishmentComponent) {
        if (component.unsaveChanges) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }
        return true;
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateRoles(routeAc);
    }
    
}