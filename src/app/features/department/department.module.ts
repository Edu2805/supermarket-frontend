import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DepartmentAppComponent } from "./department.app.component";
import { DepartmentRoutingModule } from "./department.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateDepartmentComponent } from './crud/create/create-department.component';
import { DeleteDepartmentComponent } from './crud/delete/delete-department.component';
import { DetailsDepartmentComponent } from './crud/details/details-department.component';
import { ReadDepartmentComponent } from './crud/read/read-department.component';
import { UpdateDepartmentComponent } from './crud/update/update-department.component';
import { DepartmentService } from "./services/department.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { DepartmentGuardService } from "./services/department.guard";
import { DepartmentResolve } from "./services/department.resolve";
import { EstablishmentListComponent } from "./establishment-list/establishment-list.component";
import { EstablishmentService } from "../establishment/services/establishment.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        DepartmentAppComponent,
        CreateDepartmentComponent,
        DeleteDepartmentComponent,
        DetailsDepartmentComponent,
        ReadDepartmentComponent,
        UpdateDepartmentComponent,
        EstablishmentListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        DepartmentService,
        DepartmentGuardService,
        DepartmentResolve,
        EstablishmentService
    ],
    imports:[
        CommonModule,
        DepartmentRoutingModule,
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
    exports:[]
})
export class DepartmentModule{}