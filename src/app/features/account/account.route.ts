import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AccountGuard } from "./services/account.guard";
import { DetailsUserComponent } from "./crud/details-user/details-user.component";
import { AccountResolve } from "./services/account.resolver";

const accountRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard] },
            { path: 'login', component: LoginComponent, canActivate: [AccountGuard] },
            { 
                path: 'details/:id', component: DetailsUserComponent,
                canActivate: [AccountGuard],
                data: {
                    roles: ['ADMIN', 'EMPLOYEE', 'SECTION_MANAGER', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HEAD', 'HR', 'FINANCE', 'RECEIPT']
                },
                resolve: {
                    userData: AccountResolve
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule {  }