import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonComponent } from "./person.component";
import { ReadPersonComponent } from "./crud/read-person/read-person.component";
import { PersonGuardService } from "./services/person.guard";
import { CreatePersonComponent } from "./crud/create-person/create-person.component";
import { UpdatePersonComponent } from "./crud/update-person/update-person.component";
import { PersonResolve } from "./services/person.resolve";
import { DetailsPersonComponent } from "./crud/details-person/details-person.component";
import { DeletePersonComponent } from "./crud/delete-person/delete-person.component";

const personRouterConfig: Routes = [
    {
        path: '', component: PersonComponent,
        children: [
            { 
                path: 'getAll', component: ReadPersonComponent,
                canDeactivate: [PersonGuardService],
                canActivate: [PersonGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                } 
            },
            {
                path: 'new', component: CreatePersonComponent,
                canDeactivate: [PersonGuardService],
                canActivate: [PersonGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                }
            },
            {
                path: 'edit/:id', component: UpdatePersonComponent,
                canActivate: [PersonGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    person: PersonResolve
                }
            },
            { 
                path: 'details/:id', component: DetailsPersonComponent,
                canActivate: [PersonGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    person: PersonResolve
                }
            },
            {
                path: 'delete/:id', component: DeletePersonComponent,
                canActivate: [PersonGuardService],
                data: {
                    roles: ['ADMIN', 'HEAD']
                },
                resolve: {
                    person: PersonResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(personRouterConfig)
    ],
    exports: [RouterModule]
})
export class PersonRoutingModule{}