import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobpositionComponent } from "./jobposition.component";
import { ReadJobpositionComponent } from "./crud/read-jobposition/read-jobposition.component";
import { JobPositionGuardService } from "./services/jobposition.guard";
import { CreateJobpositionComponent } from "./crud/create-jobposition/create-jobposition.component";
import { UpdateJobpositionComponent } from "./crud/update-jobposition/update-jobposition.component";
import { JobPositionResolve } from "./services/jobposition.resolve";
import { DetailsJobpositionComponent } from "./crud/details-jobposition/details-jobposition.component";
import { DeleteJobpositionComponent } from "./crud/delete-jobposition/delete-jobposition.component";

const jobpositionRouterConfig: Routes = [
    {
        path: '', component: JobpositionComponent,
        children: [
            { 
                path: 'getAll', component: ReadJobpositionComponent,
                canDeactivate: [JobPositionGuardService],
                canActivate: [JobPositionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                } 
            },
            {
                path: 'new', component: CreateJobpositionComponent,
                canDeactivate: [JobPositionGuardService],
                canActivate: [JobPositionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                }
            },
            {
                path: 'edit/:id', component: UpdateJobpositionComponent,
                canActivate: [JobPositionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    jobposition: JobPositionResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsJobpositionComponent,
                canActivate: [JobPositionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    jobposition: JobPositionResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteJobpositionComponent,
                canActivate: [JobPositionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'HR']
                },
                resolve: {
                    jobposition: JobPositionResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(jobpositionRouterConfig)
    ],
    exports: [RouterModule]
})
export class JobpositionRoutingModule{}