import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserDataComponent } from "./user-data.component";
import { UserDataRoutingModule } from "./user-data.route";

@NgModule({
    declarations:[
        UserDataComponent
    ],
    imports:[
        CommonModule,
        UserDataRoutingModule
    ],
    exports:[]
})
export class UserDataModule{}