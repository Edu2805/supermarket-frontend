import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserData } from "../models/user-data";
import { AccountService } from "./account.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountResolve implements Resolve<UserData> {

    constructor(private userDataService: AccountService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userDataService.findUserById(route.params['id']);
    }
    
}