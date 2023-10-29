import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsreceiptComponent } from "./goodsreceipt.component";
import { ReadGoodsreceiptComponent } from "./crud/read-goodsreceipt/read-goodsreceipt.component";
import { GoodsReceiptGuardService } from "./services/goodsreceipt.guard";
import { CreateGoodsreceiptComponent } from "./crud/create-goodsreceipt/create-goodsreceipt.component";
import { UpdateGoodsreceiptComponent } from "./crud/update-goodsreceipt/update-goodsreceipt.component";
import { GoodsReceiptResolve } from "./services/goodsreceipt.resolve";
import { DetailsGoodsreceiptComponent } from "./crud/details-goodsreceipt/details-goodsreceipt.component";
import { DeleteGoodsreceiptComponent } from "./crud/delete-goodsreceipt/delete-goodsreceipt.component";

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
                path: 'edit/:id', component: UpdateGoodsreceiptComponent,
                canActivate: [GoodsReceiptGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    goodsreceipt: GoodsReceiptResolve
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
            },
            {
                path: 'delete/:id', component: DeleteGoodsreceiptComponent,
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