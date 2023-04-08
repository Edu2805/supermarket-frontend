import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsissueComponent } from "./goodsissue.component";

const goodsissueRouterConfig: Routes = [
    { path: '', component: GoodsissueComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(goodsissueRouterConfig)
    ],
    exports: [RouterModule]
})
export class GoodsissueRoutingModule{}