import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentAppComponent } from "./department.app.component";
import { ReadDepartmentComponent } from "./crud/read/read-department.component";
import { DepartmentGuardService } from "./services/department.guard";
import { CreateDepartmentComponent } from "./crud/create/create-department.component";
import { UpdateDepartmentComponent } from "./crud/update/update-department.component";
import { DepartmentResolve } from "./services/department.resolve";
import { DetailsDepartmentComponent } from "./crud/details/details-department.component";
import { DeleteDepartmentComponent } from "./crud/delete/delete-department.component";

const departmentRouterConfig: Routes = [
    {
        path: '', component: DepartmentAppComponent,
        children: [
            { 
                path: 'getAll', component: ReadDepartmentComponent,
                canDeactivate: [DepartmentGuardService],
                canActivate: [DepartmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HR']
                } 
            },
            {
                path: 'new', component: CreateDepartmentComponent,
                canDeactivate: [DepartmentGuardService],
                canActivate: [DepartmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HR']
                }
            },
            {
                path: 'edit/:id', component: UpdateDepartmentComponent,
                canActivate: [DepartmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    department: DepartmentResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsDepartmentComponent,
                canActivate: [DepartmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    department: DepartmentResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteDepartmentComponent,
                canActivate: [DepartmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'DEPARTMENT_MANAGER', 'MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    department: DepartmentResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(departmentRouterConfig)
    ],
    exports: [RouterModule]
})
export class DepartmentRoutingModule{}