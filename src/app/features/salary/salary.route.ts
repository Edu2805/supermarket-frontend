import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalaryComponent } from "./salary.component";
import { ReadSalaryComponent } from "./crud/read-salary/read-salary.component";
import { CreateSalaryComponent } from "./crud/create-salary/create-salary.component";
import { UpdateSalaryComponent } from "./crud/update-salary/update-salary.component";
import { DetailsSalaryComponent } from "./crud/details-salary/details-salary.component";
import { DeleteSalaryComponent } from "./crud/delete-salary/delete-salary.component";
import { SalaryGuardService } from "./services/salary.guard";
import { SalaryResolve } from "./services/salary.resolve";

const salaryRouterConfig: Routes = [
    {
        path: '', component: SalaryComponent,
        children: [
            { 
                path: 'getAll', component: ReadSalaryComponent,
                canDeactivate: [SalaryGuardService],
                canActivate: [SalaryGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreateSalaryComponent,
                canDeactivate: [SalaryGuardService],
                canActivate: [SalaryGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            {
                path: 'edit/:id', component: UpdateSalaryComponent,
                canActivate: [SalaryGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    salary: SalaryResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsSalaryComponent,
                canActivate: [SalaryGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    salary: SalaryResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteSalaryComponent,
                canActivate: [SalaryGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    salary: SalaryResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(salaryRouterConfig)
    ],
    exports: [RouterModule]
})
export class SalaryRoutingModule{}