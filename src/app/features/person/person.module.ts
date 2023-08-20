import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreatePersonComponent } from './crud/create-person/create-person.component';
import { UpdatePersonComponent } from './crud/update-person/update-person.component';
import { DeletePersonComponent } from './crud/delete-person/delete-person.component';
import { ReadPersonComponent } from './crud/read-person/read-person.component';
import { DetailsPersonComponent } from './crud/details-person/details-person.component';
import { PersonGuardService } from "./services/person.guard";
import { PersonResolve } from "./services/person.resolve";
import { PersonService } from "./services/person.service";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { UserDataListComponent } from "./user-data-list/user-data-list.component";
import { AccountService } from "../account/services/account.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        PersonComponent,
        CreatePersonComponent,
        UpdatePersonComponent,
        DeletePersonComponent,
        ReadPersonComponent,
        DetailsPersonComponent,
        UserDataListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        PersonService,
        AccountService,
        PersonGuardService,
        PersonResolve
    ],
    imports:[
        CommonModule,
        PersonRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        TranslateModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule,
        ImageCropperModule
    ],
    exports:[]
})
export class PersonModule{}