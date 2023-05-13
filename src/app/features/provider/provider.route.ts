import { RouterModule, Routes } from "@angular/router";
import { ProviderComponent } from "./provider.component";
import { NgModule } from "@angular/core";

const providerRouterConfig: Routes = [
    { path: '', component: ProviderComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(providerRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProviderRoutingModule{}