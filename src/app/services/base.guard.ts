import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseGuard {
    
    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router){}
    
    protected validateRoles(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.getUserToken()){
            this.router.navigate(['/account/login/'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUser();
        let role: any = routeAc.data.roles[0];

        if (role !== undefined) {
            if (role) {
                if (!user.roleType) {
                    this.navegateToAccessDenied();
                }

                let valuesRoles = user.roleType as string;

                if (!valuesRoles.includes(role)) {
                    this.navegateToAccessDenied();
                }
            }
        }

        return true;
    }

    private navegateToAccessDenied() {
        this.router.navigate(['/acesso-negado']);
    }    
}