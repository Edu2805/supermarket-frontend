import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalaryComponent } from "./salary.component";

const salaryRouterConfig: Routes = [
    { path: '', component: SalaryComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(salaryRouterConfig)
    ],
    exports: [RouterModule]
})
export class SalaryRoutingModule{}