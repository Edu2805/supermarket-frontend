import { CommonModule, registerLocaleData } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { JobpositionComponent } from "./jobposition.component";
import { JobpositionRoutingModule } from "./jobposition.route";
import { TranslateModule } from "@ngx-translate/core";
import { JobPositionService } from "./services/jobposition.service";
import { CreateJobpositionComponent } from './crud/create-jobposition/create-jobposition.component';
import { ReadJobpositionComponent } from './crud/read-jobposition/read-jobposition.component';
import { UpdateJobpositionComponent } from './crud/update-jobposition/update-jobposition.component';
import { DeleteJobpositionComponent } from './crud/delete-jobposition/delete-jobposition.component';
import { DetailsJobpositionComponent } from './crud/details-jobposition/details-jobposition.component';
import { SalaryListComponent } from "./salary-list/salary-list.component";
import { JobPositionResolve } from "./services/jobposition.resolve";
import { JobPositionGuardService } from "./services/jobposition.guard";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import ptBr from '@angular/common/locales/pt';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        JobpositionComponent,
        CreateJobpositionComponent,
        ReadJobpositionComponent,
        UpdateJobpositionComponent,
        DeleteJobpositionComponent,
        DetailsJobpositionComponent,
        SalaryListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        JobPositionService,
        JobPositionResolve,
        JobPositionGuardService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        JobpositionRoutingModule,
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
export class JobpositionModule{}