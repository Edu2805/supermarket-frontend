import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductDataComponent } from "./product-data.component";
import { ProductDataRoutingModule } from "./product-data.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        ProductDataComponent
    ],
    imports:[
        CommonModule,
        ProductDataRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class ProductDataModule{}