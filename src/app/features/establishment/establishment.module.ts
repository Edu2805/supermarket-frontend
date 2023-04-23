import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EstablishmentComponent } from "./establishment.component";
import { EstablishmentRoutingModule } from "./establishment.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        EstablishmentComponent
    ],
    imports:[
        CommonModule,
        EstablishmentRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class EstablishmentModule{}