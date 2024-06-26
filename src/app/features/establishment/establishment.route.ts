import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstablishmentAppComponent } from "./establishment.app.component";
import { ReadEstablishmentComponent } from "./crud/read/read-establishment.component";
import { EstablishmentGuardService } from "./services/establishment.guard";
import { UpdateEstablishmentComponent } from "./crud/update/update-establishment.component";
import { CreateEstablishmentComponent } from "./crud/create/create-establishment.component";
import { EstablishmentResolve } from "./services/establishment.resolve";
import { DeleteEstablishmentComponent } from "./crud/delete/delete-establishment.component";
import { DetailsEstablishmentComponent } from "./crud/details/details-establishment.component";

const establishmentRouterConfig: Routes = [
    {
        path: '', component: EstablishmentAppComponent,
        children: [
            { 
                path: 'getAll', component: ReadEstablishmentComponent,
                canDeactivate: [EstablishmentGuardService],
                canActivate: [EstablishmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                } 
            },
            {
                path: 'new', component: CreateEstablishmentComponent,
                canDeactivate: [EstablishmentGuardService],
                canActivate: [EstablishmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                }
            },
            {
                path: 'edit/:id', component: UpdateEstablishmentComponent,
                canActivate: [EstablishmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                },
                resolve: {
                    establishment: EstablishmentResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsEstablishmentComponent,
                canActivate: [EstablishmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                },
                resolve: {
                    establishment: EstablishmentResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteEstablishmentComponent,
                canActivate: [EstablishmentGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'HR']
                },
                resolve: {
                    establishment: EstablishmentResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(establishmentRouterConfig)
    ],
    exports: [RouterModule]
})
export class EstablishmentRoutingModule { }