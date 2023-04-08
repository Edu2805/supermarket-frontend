import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonComponent } from "./person.component";

const personRouterConfig: Routes = [
    { path: '', component: PersonComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(personRouterConfig)
    ],
    exports: [RouterModule]
})
export class PersonRoutingModule{}