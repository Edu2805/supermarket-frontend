import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserDataService } from "./user-data.service";
import { Injectable } from "@angular/core";
import { ApproveUserDataOutput } from "../model/approve-user-output";

@Injectable()
export class UserDataResolve implements Resolve<ApproveUserDataOutput> {

    constructor(private userDataService: UserDataService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userDataService.findUserDataById(route.params['id']);
    }
    
}