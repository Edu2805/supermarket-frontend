import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDataComponent } from "./user-data.component";
import { ApproveUserComponent } from "./approve/approve-user/approve-user.component";
import { UserDataGuardService } from "./services/user-data.guard";
import { GetAllUsersComponent } from "./approve/get-all-users/get-all-users.component";
import { UserDataResolve } from "./services/user-data.resolve";

const userDataRouterConfig: Routes = [
    { 
        path: '', component: UserDataComponent,
        children: [
            { 
                path: 'getAll', component: GetAllUsersComponent,
                canDeactivate: [UserDataGuardService],
                canActivate: [UserDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                } 
            },
            {
                path: 'approve-user/:id', component: ApproveUserComponent,
                canActivate: [UserDataGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                },
                resolve: {
                    subsection: UserDataResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userDataRouterConfig)
    ],
    exports: [RouterModule]
})
export class UserDataRoutingModule { }