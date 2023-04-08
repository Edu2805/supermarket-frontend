import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsissueRoutingModule } from "./goodsissue.route";

@NgModule({
    declarations:[
        GoodsissueComponent
    ],
    imports:[
        CommonModule,
        GoodsissueRoutingModule
    ],
    exports:[]
})
export class GoodsissueModule{}