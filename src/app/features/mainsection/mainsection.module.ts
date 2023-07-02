import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainsectionComponent } from "./mainsection.component";
import { MainsectionRoutingModule } from "./mainsection.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateMainsectionComponent } from './crud/create-mainsection/create-mainsection.component';
import { DetailsMainsectionComponent } from './crud/details-mainsection/details-mainsection.component';
import { DeleteMainsectionComponent } from './crud/delete-mainsection/delete-mainsection.component';
import { ReadMainsectionComponent } from './crud/read-mainsection/read-mainsection.component';
import { UpdateMainsectionComponent } from './crud/update-mainsection/update-mainsection.component';
import { DepartmentService } from "../department/services/department.service";
import { MainSectionResolve } from "./services/mainsection.resolve";
import { MainSectionGuardService } from "./services/mainsection.guard";
import { MainsectionService } from "./services/mainsection.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { DepartmentListComponent } from "./department-list/department-list.component";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        MainsectionComponent,
        CreateMainsectionComponent,
        DetailsMainsectionComponent,
        DeleteMainsectionComponent,
        ReadMainsectionComponent,
        UpdateMainsectionComponent,
        DepartmentListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        MainSectionResolve,
        MainSectionGuardService,
        MainsectionService,
        DepartmentService,
    ],
    imports:[
        CommonModule,
        MainsectionRoutingModule,
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
export class MainsectionModule{}