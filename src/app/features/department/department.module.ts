import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DepartmentComponent } from "./department.component";
import { DepartmentRoutingModule } from "./department.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        DepartmentComponent
    ],
    imports:[
        CommonModule,
        DepartmentRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class DepartmentModule{}