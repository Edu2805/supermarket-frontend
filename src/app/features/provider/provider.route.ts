import { RouterModule, Routes } from "@angular/router";
import { ProviderComponent } from "./provider.component";
import { NgModule } from "@angular/core";
import { ReadProviderComponent } from "./crud/read-provider/read-provider.component";
import { ProviderGuardService } from "./services/provider.guard";
import { ProviderResolve } from "./services/provider.resolve";
import { CreateProviderComponent } from "./crud/create-provider/create-provider.component";
import { UpdateProviderComponent } from "./crud/update-provider/update-provider.component";
import { DetailsProviderComponent } from "./crud/details-provider/details-provider.component";
import { DeleteProviderComponent } from "./crud/delete-provider/delete-provider.component";

const providerRouterConfig: Routes = [
    {
        path: '', component: ProviderComponent,
        children: [
            { 
                path: 'getAll', component: ReadProviderComponent,
                canDeactivate: [ProviderGuardService],
                canActivate: [ProviderGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreateProviderComponent,
                canDeactivate: [ProviderGuardService],
                canActivate: [ProviderGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            {
                path: 'edit/:id', component: UpdateProviderComponent,
                canActivate: [ProviderGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    provider: ProviderResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsProviderComponent,
                canActivate: [ProviderGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    provider: ProviderResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteProviderComponent,
                canActivate: [ProviderGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    provider: ProviderResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(providerRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProviderRoutingModule{}