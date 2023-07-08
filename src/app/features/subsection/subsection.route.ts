import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubsectionComponent } from "./subsection.component";
import { ReadSubsectionComponent } from "./crud/read-subsection/read-subsection.component";
import { SubSectionGuardService } from "./services/subsection.guard";
import { SubSectionResolve } from "./services/subsection.resolve";
import { CreateSubsectionComponent } from "./crud/create-subsection/create-subsection.component";
import { UpdateSubsectionComponent } from "./crud/update-subsection/update-subsection.component";
import { DetailsSubsectionComponent } from "./crud/details-subsection/details-subsection.component";
import { DeleteSubsectionComponent } from "./crud/delete-subsection/delete-subsection.component";

const subsectionRouterConfig: Routes = [
    {
        path: '', component: SubsectionComponent,
        children: [
            { 
                path: 'getAll', component: ReadSubsectionComponent,
                canDeactivate: [SubSectionGuardService],
                canActivate: [SubSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreateSubsectionComponent,
                canDeactivate: [SubSectionGuardService],
                canActivate: [SubSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            {
                path: 'edit/:id', component: UpdateSubsectionComponent,
                canActivate: [SubSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    subsection: SubSectionResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsSubsectionComponent,
                canActivate: [SubSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    subsection: SubSectionResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteSubsectionComponent,
                canActivate: [SubSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    subsection: SubSectionResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(subsectionRouterConfig)
    ],
    exports: [RouterModule]
})
export class SubsectionRoutingModule{}