import { CommonModule, registerLocaleData } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { GoodsreceiptComponent } from "./goodsreceipt.component";
import { GoodsreceiptRoutingModule } from "./goodsreceipt.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateGoodsreceiptComponent } from './feature/create-goodsreceipt/create-goodsreceipt.component';
import { DetailsGoodsreceiptComponent } from './feature/details-goodsreceipt/details-goodsreceipt.component';
import { ReadGoodsreceiptComponent } from './feature/read-goodsreceipt/read-goodsreceipt.component';
import { IConfig, NgxMaskModule } from "ngx-mask";
import ptBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoodsReceiptGuardService } from "./services/goodsreceipt.guard";
import { GoodsReceiptResolve } from "./services/goodsreceipt.resolve";
import { HttpClientModule } from "@angular/common/http";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { ProductDataService } from "../product-data/services/product-data.service";
import { GoodsReceiptProductListComponent } from "./goods-receipt-product-list/goods-receipt-product-list.component";
import { HistoricalGoodsReceiptService } from "../historical-goods-receipt/services/historical-goods-receipt.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        GoodsreceiptComponent,
        CreateGoodsreceiptComponent,
        DetailsGoodsreceiptComponent,
        ReadGoodsreceiptComponent,
        GoodsReceiptProductListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        GoodsReceiptGuardService,
        GoodsReceiptResolve,
        GoodsReceiptGuardService,
        ProductDataService,
        HistoricalGoodsReceiptService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        GoodsreceiptRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        ImageCropperModule
    ],
    exports:[]
})
export class GoodsreceiptModule{}