import { Component } from "@angular/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent { 
    private localStorageUtils = new LocalStorageUtils();

    verifyUserAccess(...holes: string[]): boolean {
        let user = this.localStorageUtils.getUser();
        return holes.includes(user.roleType);
    }
}