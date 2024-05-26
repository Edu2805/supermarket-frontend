import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsIssueGuardService } from "./services/goodsissue.guard";
import { GoodsIssueResolve } from "./services/goodsissue.resolve";
import { CreateGoodsIssueComponent } from "./feature/create-goods-issue/create-goods-issue.component";
import { ReadGoodsIssueComponent } from "./feature/read-goods-issue/read-goods-issue.component";
import { DetailsGoodsIssueComponent } from "./feature/details-goods-issue/details-goods-issue.component";

const goodsissueRouterConfig: Routes = [
    {
        path: '', component: GoodsissueComponent,
        children: [
            { 
                path: 'getAll', component: ReadGoodsIssueComponent,
                canDeactivate: [GoodsIssueGuardService],
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                } 
            },
            {
                path: 'new', component: CreateGoodsIssueComponent,
                canDeactivate: [GoodsIssueGuardService],
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                }
            },
            { 
                path: 'details/:id', component: DetailsGoodsIssueComponent,
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
                },
                resolve: {
                    goodsissue: GoodsIssueResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(goodsissueRouterConfig)
    ],
    exports: [RouterModule]
})
export class GoodsissueRoutingModule{}