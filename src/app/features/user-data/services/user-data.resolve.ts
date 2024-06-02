import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserDataDetailsOutput } from "../../account/models/user-data-details-output";
import { UserDataService } from "./user-data.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UserDataResolve implements Resolve<UserDataDetailsOutput> {

    constructor(private userDataService: UserDataService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userDataService.findUserDataById(route.params['id']);
    }
    
}