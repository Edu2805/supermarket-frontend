import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { JobpositionComponent } from "./jobposition.component";
import { JobpositionRoutingModule } from "./jobposition.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        JobpositionComponent
    ],
    imports:[
        CommonModule,
        JobpositionRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class JobpositionModule{}