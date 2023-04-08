import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { JobpositionComponent } from "./jobposition.component";
import { JobpositionRoutingModule } from "./jobposition.route";

@NgModule({
    declarations:[
        JobpositionComponent
    ],
    imports:[
        CommonModule,
        JobpositionRoutingModule
    ],
    exports:[]
})
export class JobpositionModule{}