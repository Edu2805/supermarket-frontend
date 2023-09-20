import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { TranslateModule } from "@ngx-translate/core";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { OtherDiscountComponent } from './other-discount.component';
import { ReadOtherDiscountComponent } from './crud/read-other-discount/read-other-discount.component';
import { UpdateOtherDiscountComponent } from './crud/update-other-discount/update-other-discount.component';
import { DeleteOtherDiscountComponent } from './crud/delete-other-discount/delete-other-discount.component';
import { CreateOtherDiscountComponent } from './crud/create-other-discount/create-other-discount.component';
import { OtherDiscountService } from "./services/other-discount.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
    OtherDiscountComponent,
    ReadOtherDiscountComponent,
    UpdateOtherDiscountComponent,
    DeleteOtherDiscountComponent,
    CreateOtherDiscountComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        OtherDiscountService
    ],
    imports:[
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NarikCustomValidatorsModule,
      TranslateModule,
      NgxSpinnerModule,
      NgxMaskModule.forRoot(maskConfigFunction),
      PaginationModule,
    ],
    exports:[
      CreateOtherDiscountComponent
    ]
})
export class OtherDiscountModule{}