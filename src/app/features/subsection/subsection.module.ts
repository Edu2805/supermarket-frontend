import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubsectionComponent } from "./subsection.component";
import { SubsectionRoutingModule } from "./subsection.route";

@NgModule({
    declarations:[
        SubsectionComponent
    ],
    imports:[
        CommonModule,
        SubsectionRoutingModule
    ],
    exports:[]
})
export class SubsectionModule{}