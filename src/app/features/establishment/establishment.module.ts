import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EstablishmentComponent } from "./establishment.component";
import { EstablishmentRoutingModule } from "./establishment.route";

@NgModule({
    declarations:[
        EstablishmentComponent
    ],
    imports:[
        CommonModule,
        EstablishmentRoutingModule
    ],
    exports:[]
})
export class EstablishmentModule{}