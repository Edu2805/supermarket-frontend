import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AccountService } from "./account.service";
import { Injectable } from "@angular/core";
import { UserDataDetailsOutput } from "../models/user-data-details-output";

@Injectable()
export class AccountResolve implements Resolve<UserDataDetailsOutput> {

    constructor(private userDataService: AccountService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userDataService.findUserById(route.params['id']);
    }
    
}