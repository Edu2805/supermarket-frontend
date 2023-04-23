import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubsectionComponent } from "./subsection.component";
import { SubsectionRoutingModule } from "./subsection.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        SubsectionComponent
    ],
    imports:[
        CommonModule,
        SubsectionRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class SubsectionModule{}