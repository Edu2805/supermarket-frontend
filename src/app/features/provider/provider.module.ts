import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ProviderComponent } from "./provider.component";
import { CommonModule } from "@angular/common";
import { ProviderRoutingModule } from "./provider.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateProviderComponent } from './crud/create-provider/create-provider.component';
import { ReadProviderComponent } from './crud/read-provider/read-provider.component';
import { UpdateProviderComponent } from './crud/update-provider/update-provider.component';
import { DeleteProviderComponent } from './crud/delete-provider/delete-provider.component';
import { DetailsProviderComponent } from './crud/details-provider/details-provider.component';
import { IConfig, NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";
import { ProviderResolve } from "./services/provider.resolve";
import { ProviderGuardService } from "./services/provider.guard";
import { ProviderService } from "./services/provider.service";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        ProviderComponent,
        CreateProviderComponent,
        ReadProviderComponent,
        UpdateProviderComponent,
        DeleteProviderComponent,
        DetailsProviderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ProviderResolve,
        ProviderGuardService,
        ProviderService,
    ],
    imports:[
        CommonModule,
        ProviderRoutingModule,
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
export class ProviderModule{}