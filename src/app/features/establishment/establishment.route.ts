import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstablishmentComponent } from "./establishment.component";

const establishmentRouterConfig: Routes = [
    { path: '', component: EstablishmentComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(establishmentRouterConfig)
    ],
    exports: [RouterModule]
})
export class EstablishmentRoutingModule{}