import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsIssueGuardService } from "./services/goodsissue.guard";
import { GoodsIssueResolve } from "./services/goodsissue.resolve";

const goodsissueRouterConfig: Routes = [
    {
        path: '', component: GoodsissueComponent,
        children: [
            { 
                path: 'getAll', component: GoodsissueComponent,
                canDeactivate: [GoodsIssueGuardService],
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: GoodsissueComponent,
                canDeactivate: [GoodsIssueGuardService],
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            { 
                path: 'details/:id', component: GoodsissueComponent,
                canActivate: [GoodsIssueGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
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