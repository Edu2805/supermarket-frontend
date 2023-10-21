import { CommonModule, registerLocaleData } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateEmployeeComponent } from './crud/create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './crud/delete-employee/delete-employee.component';
import { DetailsEmployeeComponent } from './crud/details-employee/details-employee.component';
import { ReadEmployeeComponent } from './crud/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './crud/update-employee/update-employee.component';
import { EmployeeGuardService } from "./services/employee.guard";
import { EmployeeResolve } from "./services/employee.resolve";
import { EmployeeService } from "./services/employee.service";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { JobPositionListComponent } from "./jobposition-list/jobposition-list.component";
import { PersonListComponent } from "./person-list/person-list.component";
import { SubSectionListComponent } from "./subsection-list/subsection-list.component";
import { SubsectionService } from "../subsection/services/subsection.service";
import { JobPositionService } from "../jobposition/services/jobposition.service";
import ptBr from '@angular/common/locales/pt';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

registerLocaleData(ptBr);

@NgModule({
    declarations:[
        EmployeeComponent,
        CreateEmployeeComponent,
        DeleteEmployeeComponent,
        DetailsEmployeeComponent,
        ReadEmployeeComponent,
        UpdateEmployeeComponent,
        JobPositionListComponent,
        PersonListComponent,
        SubSectionListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        EmployeeGuardService,
        EmployeeResolve,
        EmployeeService,
        SubsectionService,
        JobPositionService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        EmployeeRoutingModule,
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
export class EmployeeModule{}