import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SalaryComponent } from "./salary.component";
import { SalaryRoutingModule } from "./salary.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        SalaryComponent
    ],
    imports:[
        CommonModule,
        SalaryRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class SalaryModule{}