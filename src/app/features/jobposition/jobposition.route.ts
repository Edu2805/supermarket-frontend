import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobpositionComponent } from "./jobposition.component";

const jobpositionRouterConfig: Routes = [
    { path: '', component: JobpositionComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(jobpositionRouterConfig)
    ],
    exports: [RouterModule]
})
export class JobpositionRoutingModule{}