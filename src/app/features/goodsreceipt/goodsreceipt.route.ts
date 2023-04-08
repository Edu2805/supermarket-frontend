import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsreceiptComponent } from "./goodsreceipt.component";

const goodsreceiptRouterConfig: Routes = [
    { path: '', component: GoodsreceiptComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(goodsreceiptRouterConfig)
    ],
    exports: [RouterModule]
})
export class GoodsreceiptRoutingModule{}