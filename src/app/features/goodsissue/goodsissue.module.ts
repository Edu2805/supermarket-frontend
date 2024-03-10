import { CommonModule, registerLocaleData } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsissueRoutingModule } from "./goodsissue.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateGoodsIssueComponent } from './feature/create-goods-issue/create-goods-issue.component';
import { ReadGoodsIssueComponent } from './feature/read-goods-issue/read-goods-issue.component';
import { UpdateGoodsIssueComponent } from './feature/update-goods-issue/update-goods-issue.component';
import { DeleteGoodsIssueComponent } from './feature/delete-goods-issue/delete-goods-issue.component';
import { DetailsGoodsIssueComponent } from './feature/details-goods-issue/details-goods-issue.component';
import { GoodsIssueGuardService } from "./services/goodsissue.guard";
import { GoodsIssueResolve } from "./services/goodsissue.resolve";
import { GoodsissueService } from "./services/goodsissue.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { ImageCropperModule } from "ngx-image-cropper";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { ProductDataService } from "../product-data/services/product-data.service";
import ptBr from '@angular/common/locales/pt';
import { GoodsIssueProductListComponent } from "./goods-issue-product-list/goods-issue-product-list.component";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        GoodsissueComponent,
        CreateGoodsIssueComponent,
        ReadGoodsIssueComponent,
        UpdateGoodsIssueComponent,
        DeleteGoodsIssueComponent,
        DetailsGoodsIssueComponent,
        GoodsIssueProductListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        GoodsissueService,
        ProductDataService,
        GoodsIssueResolve,
        GoodsIssueGuardService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        ImageCropperModule,
        GoodsissueRoutingModule,
    ],
    exports:[]
})
export class GoodsissueModule{}