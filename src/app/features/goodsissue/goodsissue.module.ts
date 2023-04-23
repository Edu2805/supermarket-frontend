import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsissueRoutingModule } from "./goodsissue.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        GoodsissueComponent
    ],
    imports:[
        CommonModule,
        GoodsissueRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class GoodsissueModule{}