import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SubsectionComponent } from "./subsection.component";
import { SubsectionRoutingModule } from "./subsection.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateSubsectionComponent } from './crud/create-subsection/create-subsection.component';
import { UpdateSubsectionComponent } from './crud/update-subsection/update-subsection.component';
import { ReadSubsectionComponent } from './crud/read-subsection/read-subsection.component';
import { DeleteSubsectionComponent } from './crud/delete-subsection/delete-subsection.component';
import { DetailsSubsectionComponent } from './crud/details-subsection/details-subsection.component';
import { MainsectionListComponent } from "./mainsection-list/mainsection-list.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { MainsectionService } from "../mainsection/services/mainsection.service";
import { SubSectionGuardService } from "./services/subsection.guard";
import { SubSectionResolve } from "./services/subsection.resolve";
import { SubsectionService } from "./services/subsection.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        SubsectionComponent,
        CreateSubsectionComponent,
        UpdateSubsectionComponent,
        ReadSubsectionComponent,
        DeleteSubsectionComponent,
        DetailsSubsectionComponent,
        MainsectionListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        SubSectionResolve,
        SubSectionGuardService,
        SubsectionService,
        MainsectionService,
    ],
    imports:[
        SubsectionRoutingModule,
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
    exports: []
})
export class SubsectionModule{}