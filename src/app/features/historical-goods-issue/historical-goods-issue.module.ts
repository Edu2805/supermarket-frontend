import { registerLocaleData, CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { TranslateModule } from "@ngx-translate/core";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { HistoricalGoodsIssueService } from "./services/historical-goods-issue.service";
import ptBr from '@angular/common/locales/pt';
import { HistoricalGoodsIssueComponent } from "./historical-goods-issue.component";


const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        HistoricalGoodsIssueComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        HistoricalGoodsIssueService,
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
        PaginationModule,
        PipeModule,
        NgxMaskModule.forRoot(maskConfigFunction),
    ],
    exports:[]
})
export class HistoricalGoodsIssueModule{}