import { CommonModule, DatePipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { UserDataComponent } from "./user-data.component";
import { UserDataRoutingModule } from "./user-data.route";
import { TranslateModule } from "@ngx-translate/core";
import { UserDataService } from "./services/user-data.service";
import { ApproveUserComponent } from './approve/approve-user/approve-user.component';
import { GetAllUsersComponent } from './approve/get-all-users/get-all-users.component';
import { UserDataGuardService } from "./services/user-data.guard";
import { UserDataResolve } from "./services/user-data.resolve";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NarikCustomValidatorsModule } from "@narik/custom-validators";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from "src/app/utils/pagination/pagination.module";
import { PipeModule } from "src/app/utils/pipe/pipe.module";

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
      validation: false,
    };
};

@NgModule({
    declarations:[
        UserDataComponent,
        ApproveUserComponent,
        GetAllUsersComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports:[
        CommonModule,
        UserDataRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        NgxSpinnerModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        PaginationModule,
        PipeModule
    ],
    exports:[],
    providers:[
        UserDataService,
        UserDataGuardService,
        UserDataResolve,
        DatePipe
    ]
})
export class UserDataModule{}