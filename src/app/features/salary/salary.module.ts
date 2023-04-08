import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SalaryComponent } from "./salary.component";
import { SalaryRoutingModule } from "./salary.route";

@NgModule({
    declarations:[
        SalaryComponent
    ],
    imports:[
        CommonModule,
        SalaryRoutingModule
    ],
    exports:[]
})
export class SalaryModule{}