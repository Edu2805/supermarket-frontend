import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { EstablishmentAppComponent } from "./establishment.app.component";
import { EstablishmentRoutingModule } from "./establishment.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateEstablishmentComponent } from './crud/create/create-establishment/create-establishment.component';
import { ReadEstablishmentComponent } from './crud/read/read-establishment/read-establishment.component';
import { UpdateEstablishmentComponent } from './crud/update/update-establishment/update-establishment.component';
import { DeleteEstablishmentComponent } from './crud/delete/delete-establishment/delete-establishment.component';
import { EstablishmentService } from "./services/establishment.service";
import { EstablishmentGuardService } from "./services/establishment.guard";
import { PaginationComponent } from "src/app/utils/pagination/pagination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { EstablishmentResolve } from "./services/establishment.resolve";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        EstablishmentAppComponent,
        CreateEstablishmentComponent,
        ReadEstablishmentComponent,
        UpdateEstablishmentComponent,
        DeleteEstablishmentComponent,
        PaginationComponent
    ],
    imports:[
        CommonModule,
        EstablishmentRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        TranslateModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        EstablishmentService,
        EstablishmentGuardService,
        EstablishmentResolve
    ],
    exports:[]
})
export class EstablishmentModule{}