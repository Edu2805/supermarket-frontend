import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoodsreceiptComponent } from "./goodsreceipt.component";
import { GoodsreceiptRoutingModule } from "./goodsreceipt.route";

@NgModule({
    declarations:[
        GoodsreceiptComponent
    ],
    imports:[
        CommonModule,
        GoodsreceiptRoutingModule
    ],
    exports:[]
})
export class GoodsreceiptModule{}