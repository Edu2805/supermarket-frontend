import { CommonModule, registerLocaleData } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { SalaryComponent } from "./salary.component";
import { SalaryRoutingModule } from "./salary.route";
import { TranslateModule } from "@ngx-translate/core";
import { UpdateSalaryComponent } from './crud/update-salary/update-salary.component';
import { ReadSalaryComponent } from './crud/read-salary/read-salary.component';
import { DetailsSalaryComponent } from './crud/details-salary/details-salary.component';
import { DeleteSalaryComponent } from './crud/delete-salary/delete-salary.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { CreateSalaryComponent } from "./crud/create-salary/create-salary.component";
import { SalaryService } from "./services/salary.service";
import { SalaryGuardService } from "./services/salary.guard";
import { SalaryResolve } from "./services/salary.resolve";
import { OtherAdditionModule } from "../other-addition/other-addition.module";
import { OtherAdditionService } from "../other-addition/services/other-addition.service";
import { OtherDiscountModule } from "../other-discount/other-discount.module";
import ptBr from '@angular/common/locales/pt';
import { OtherAdditionListComponent } from "./other-addition-list/other-addition-list.component";
import { OtherDiscountListComponent } from "./other-discount-list/other-discount-list.component";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        SalaryComponent,
        CreateSalaryComponent,
        UpdateSalaryComponent,
        ReadSalaryComponent,
        DetailsSalaryComponent,
        DeleteSalaryComponent,
        OtherAdditionListComponent,
        OtherDiscountListComponent
    ],
    providers: [
        SalaryService,
        SalaryGuardService,
        SalaryResolve,
        OtherAdditionService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        SalaryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        TranslateModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        OtherAdditionModule,
        OtherDiscountModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports:[]
})
export class SalaryModule{}