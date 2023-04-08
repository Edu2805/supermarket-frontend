import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainsectionComponent } from "./mainsection.component";

const mainsectionRouterConfig: Routes = [
    { path: '', component: MainsectionComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainsectionRouterConfig)
    ],
    exports: [RouterModule]
})
export class MainsectionRoutingModule{}