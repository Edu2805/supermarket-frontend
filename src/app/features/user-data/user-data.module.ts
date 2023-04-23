import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserDataComponent } from "./user-data.component";
import { UserDataRoutingModule } from "./user-data.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        UserDataComponent
    ],
    imports:[
        CommonModule,
        UserDataRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class UserDataModule{}