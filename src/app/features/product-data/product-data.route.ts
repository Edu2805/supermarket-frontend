import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDataComponent } from "./product-data.component";

const productDataRouterConfig: Routes = [
    { path: '', component: ProductDataComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(productDataRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProductDataRoutingModule{}