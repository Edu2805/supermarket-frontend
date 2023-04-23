import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        EmployeeComponent
    ],
    imports:[
        CommonModule,
        EmployeeRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class EmployeeModule{}