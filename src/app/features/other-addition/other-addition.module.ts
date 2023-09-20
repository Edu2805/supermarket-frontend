import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { TranslateModule } from "@ngx-translate/core";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { OtherAdditionComponent } from './other-addition.component';
import { OtherAdditionService } from "./services/other-addition.service";
import { CreateOtherAdditionComponent } from './crud/create-other-addition/create-other-addition.component';
import { DeleteOtherAdditionComponent } from './crud/delete-other-addition/delete-other-addition.component';
import { UpdateOtherAdditionComponent } from './crud/update-other-addition/update-other-addition.component';
import { ReadOtherAdditionComponent } from './crud/read-other-addition/read-other-addition.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
    OtherAdditionComponent,
    CreateOtherAdditionComponent,
    DeleteOtherAdditionComponent,
    UpdateOtherAdditionComponent,
    ReadOtherAdditionComponent,
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        OtherAdditionService
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
      CreateOtherAdditionComponent
    ]
})
export class OtherAdditionModule{}