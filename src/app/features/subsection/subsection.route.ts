import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubsectionComponent } from "./subsection.component";

const subsectionRouterConfig: Routes = [
    { path: '', component: SubsectionComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(subsectionRouterConfig)
    ],
    exports: [RouterModule]
})
export class SubsectionRoutingModule{}