import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentComponent } from "./department.component";

const departmentRouterConfig: Routes = [
    { path: '', component: DepartmentComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(departmentRouterConfig)
    ],
    exports: [RouterModule]
})
export class DepartmentRoutingModule{}