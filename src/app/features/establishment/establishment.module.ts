import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { EstablishmentAppComponent } from "./establishment.app.component";
import { EstablishmentRoutingModule } from "./establishment.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateEstablishmentComponent } from './crud/create/create-establishment.component';
import { ReadEstablishmentComponent } from './crud/read/read-establishment.component';
import { UpdateEstablishmentComponent } from './crud/update/update-establishment.component';
import { DeleteEstablishmentComponent } from './crud/delete/delete-establishment.component';
import { EstablishmentService } from "./services/establishment.service";
import { EstablishmentGuardService } from "./services/establishment.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { EstablishmentResolve } from "./services/establishment.resolve";
import { DetailsEstablishmentComponent } from './crud/details/details-establishment.component';
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { ImageCropperModule } from "ngx-image-cropper";

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
        DetailsEstablishmentComponent
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
        PaginationModule,
        PipeModule,
        ImageCropperModule
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