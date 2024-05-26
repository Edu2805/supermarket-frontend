import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { NavigationGuard } from "./services/navigation.guard";

const navigationRouterConfig: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [NavigationGuard],
        data: {
            roles: ['ADMIN', 'HEAD', 'MANAGER', 'FINANCE', 'DEPARTMENT_MANAGER', 'BUYER', 'SECTION_MANAGER', 'EMPLOYEE', 'HR', 'RECEIPT']
        },
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(navigationRouterConfig)
    ],
    exports: [RouterModule]
})
export class NavigationRoutingModule{}