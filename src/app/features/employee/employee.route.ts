import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";

const employeeRouterConfig: Routes = [
    { path: '', component: EmployeeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(employeeRouterConfig)
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule{}