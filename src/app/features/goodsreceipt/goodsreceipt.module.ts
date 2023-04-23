import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoodsreceiptComponent } from "./goodsreceipt.component";
import { GoodsreceiptRoutingModule } from "./goodsreceipt.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        GoodsreceiptComponent
    ],
    imports:[
        CommonModule,
        GoodsreceiptRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class GoodsreceiptModule{}