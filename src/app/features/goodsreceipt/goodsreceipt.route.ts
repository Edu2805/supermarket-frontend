import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsreceiptComponent } from "./goodsreceipt.component";
import { ReadGoodsreceiptComponent } from "./feature/read-goodsreceipt/read-goodsreceipt.component";
import { GoodsReceiptGuardService } from "./services/goodsreceipt.guard";
import { CreateGoodsreceiptComponent } from "./feature/create-goodsreceipt/create-goodsreceipt.component";
import { GoodsReceiptResolve } from "./services/goodsreceipt.resolve";
import { DetailsGoodsreceiptComponent } from "./feature/details-goodsreceipt/details-goodsreceipt.component";

const goodsreceiptRouterConfig: Routes = [
    {
        path: '', component: GoodsreceiptComponent,
        children: [
            { 
                path: 'getAll', component: ReadGoodsreceiptComponent,
                canDeactivate: [GoodsReceiptGuardService],
                canActivate: [GoodsReceiptGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreateGoodsreceiptComponent,
                canDeactivate: [GoodsReceiptGuardService],
                canActivate: [GoodsReceiptGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            { 
                path: 'details/:id', component: DetailsGoodsreceiptComponent,
                canActivate: [GoodsReceiptGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    goodsreceipt: GoodsReceiptResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(goodsreceiptRouterConfig)
    ],
    exports: [RouterModule]
})
export class GoodsreceiptRoutingModule{}