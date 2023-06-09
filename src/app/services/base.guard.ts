import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseGuard {
    
    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router){}
    
    protected validateRoles(routeAc: ActivatedRouteSnapshot) : boolean {
        let validateCurrentRole: boolean = false;
        if(!this.localStorageUtils.getUserToken()){
            this.router.navigate(['/account/login/'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUser();
        routeAc.data.roles.forEach((role: any) => {
            if (role !== undefined) {
                if (role) {
                    if (!user.roleType) {
                        this.navegateToAccessDenied();
                    }
    
                    let valuesRoles = user.roleType as string;
    
                    if (valuesRoles.includes(role)) {
                        validateCurrentRole = true;
                    }
                }
            }  
        });
        if (!validateCurrentRole) {
            this.navegateToAccessDenied();
        }

        return validateCurrentRole;
    }

    private navegateToAccessDenied() {
        this.router.navigate(['/acesso-negado']);
    }    
}