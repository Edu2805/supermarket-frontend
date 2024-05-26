import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { ReadEmployeeComponent } from "./crud/read-employee/read-employee.component";
import { CreateEmployeeComponent } from "./crud/create-employee/create-employee.component";
import { UpdateEmployeeComponent } from "./crud/update-employee/update-employee.component";
import { DetailsEmployeeComponent } from "./crud/details-employee/details-employee.component";
import { DeleteEmployeeComponent } from "./crud/delete-employee/delete-employee.component";
import { EmployeeGuardService } from "./services/employee.guard";
import { EmployeeResolve } from "./services/employee.resolve";

const employeeRouterConfig: Routes = [
    {
        path: '', component: EmployeeComponent,
        children: [
            { 
                path: 'getAll', component: ReadEmployeeComponent,
                canDeactivate: [EmployeeGuardService],
                canActivate: [EmployeeGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                } 
            },
            {
                path: 'new', component: CreateEmployeeComponent,
                canDeactivate: [EmployeeGuardService],
                canActivate: [EmployeeGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                }
            },
            {
                path: 'edit/:id', component: UpdateEmployeeComponent,
                canActivate: [EmployeeGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    employee: EmployeeResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsEmployeeComponent,
                canActivate: [EmployeeGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    employee: EmployeeResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteEmployeeComponent,
                canActivate: [EmployeeGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    employee: EmployeeResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(employeeRouterConfig)
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule{}