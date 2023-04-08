import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DepartmentComponent } from "./department.component";
import { DepartmentRoutingModule } from "./department.route";

@NgModule({
    declarations:[
        DepartmentComponent
    ],
    imports:[
        CommonModule,
        DepartmentRoutingModule
    ],
    exports:[]
})
export class DepartmentModule{}