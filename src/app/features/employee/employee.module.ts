import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee.route";

@NgModule({
    declarations:[
        EmployeeComponent
    ],
    imports:[
        CommonModule,
        EmployeeRoutingModule
    ],
    exports:[]
})
export class EmployeeModule{}