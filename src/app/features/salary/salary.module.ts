import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
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

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        SalaryComponent,
        CreateSalaryComponent,
        UpdateSalaryComponent,
        ReadSalaryComponent,
        DetailsSalaryComponent,
        DeleteSalaryComponent
    ],
    providers: [
        SalaryService,
        SalaryGuardService,
        SalaryResolve
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
        PipeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports:[]
})
export class SalaryModule{}