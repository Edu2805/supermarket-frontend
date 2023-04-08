import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductDataComponent } from "./product-data.component";
import { ProductDataRoutingModule } from "./product-data.route";

@NgModule({
    declarations:[
        ProductDataComponent
    ],
    imports:[
        CommonModule,
        ProductDataRoutingModule
    ],
    exports:[]
})
export class ProductDataModule{}