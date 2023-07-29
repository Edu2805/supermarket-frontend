import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ProductDataComponent } from "./product-data.component";
import { ProductDataRoutingModule } from "./product-data.route";
import { TranslateModule } from "@ngx-translate/core";
import { DeleteProductDataComponent } from './crud/delete-product-data/delete-product-data.component';
import { DetailsProductDataComponent } from './crud/details-product-data/details-product-data.component';
import { ReadProductDataComponent } from './crud/read-product-data/read-product-data.component';
import { UpdateProductDataComponent } from './crud/update-product-data/update-product-data.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { ProviderProductListComponent } from "./provider-product-list/provider-product-list.component";
import { ProductDataResolve } from "./services/product-data.resolve";
import { ProductDataGuardService } from "./services/product-data.guard";
import { ProductDataService } from "./services/product-data.service";
import { CreateProductDataComponent } from "./crud/create-product-data/create-product-data.component";
import { SubsectionProductListComponent } from "./subsection-product-list/subsection-product-list.component";
import { ImageCropperModule } from "ngx-image-cropper";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        ProductDataComponent,
        CreateProductDataComponent,
        DeleteProductDataComponent,
        DetailsProductDataComponent,
        ReadProductDataComponent,
        UpdateProductDataComponent,
        ProviderProductListComponent,
        SubsectionProductListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ProductDataService,
        ProductDataGuardService,
        ProductDataResolve
    ],
    imports:[
        CommonModule,
        ProductDataRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        TranslateModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        ImageCropperModule
    ],
    exports:[]
})
export class ProductDataModule{}