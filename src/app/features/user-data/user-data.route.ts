import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDataComponent } from "./user-data.component";

const userDataRouterConfig: Routes = [
    { path: '', component: UserDataComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(userDataRouterConfig)
    ],
    exports: [RouterModule]
})
export class UserDataRoutingModule { }