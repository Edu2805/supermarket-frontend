import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.route";

@NgModule({
    declarations:[
        HomeComponent
    ],
    imports:[
        CommonModule,
        HomeRoutingModule
    ],
    exports:[]
})
export class HomeModule{}