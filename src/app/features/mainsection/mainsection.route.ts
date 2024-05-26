import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainsectionComponent } from "./mainsection.component";
import { ReadMainsectionComponent } from "./crud/read-mainsection/read-mainsection.component";
import { MainSectionGuardService } from "./services/mainsection.guard";
import { CreateMainsectionComponent } from "./crud/create-mainsection/create-mainsection.component";
import { UpdateMainsectionComponent } from "./crud/update-mainsection/update-mainsection.component";
import { MainSectionResolve } from "./services/mainsection.resolve";
import { DetailsMainsectionComponent } from "./crud/details-mainsection/details-mainsection.component";
import { DeleteMainsectionComponent } from "./crud/delete-mainsection/delete-mainsection.component";

const mainsectionRouterConfig: Routes = [
    {
        path: '', component: MainsectionComponent,
        children: [
            { 
                path: 'getAll', component: ReadMainsectionComponent,
                canDeactivate: [MainSectionGuardService],
                canActivate: [MainSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'DEPARTMENT_MANAGER', 'SECTION_MANAGER', 'BUYER', 'HR']
                } 
            },
            {
                path: 'new', component: CreateMainsectionComponent,
                canDeactivate: [MainSectionGuardService],
                canActivate: [MainSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'DEPARTMENT_MANAGER', 'SECTION_MANAGER', 'BUYER', 'HR']
                }
            },
            {
                path: 'edit/:id', component: UpdateMainsectionComponent,
                canActivate: [MainSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'DEPARTMENT_MANAGER', 'SECTION_MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    mainsection: MainSectionResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsMainsectionComponent,
                canActivate: [MainSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'DEPARTMENT_MANAGER', 'SECTION_MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    mainsection: MainSectionResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteMainsectionComponent,
                canActivate: [MainSectionGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD', 'MANAGER', 'DEPARTMENT_MANAGER', 'SECTION_MANAGER', 'BUYER', 'HR']
                },
                resolve: {
                    mainsection: MainSectionResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainsectionRouterConfig)
    ],
    exports: [RouterModule]
})
export class MainsectionRoutingModule{}